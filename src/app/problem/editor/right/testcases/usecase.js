import {useRef, useState} from "react";
import {useUploads} from "../../../../usecases/UploadFilesUseCase";
import {TestcaseIOsPatch} from "../../../../../services/ProblemService";

let currentTestcaseEdits = [];

const useTestcaseEditList = () => {
    const [problem,  setProblem] = useState(undefined);
    const [testcaseEdits, setTestcaseEdits] = useState(undefined);

    const addNewTestcase = () => {
        const nextId = testcaseEdits.length === 0 ? 0 : generateNextTestcaseId(testcaseEdits);
        const newTestcaseEdit = new TestcaseEdit({
            id: nextId.toString(),
            name: nextId.toString(),
            timeLimit: 1,
            memoryLimit: 1,
            outputLimit: 1,
            threadNumberLimit: -1,  // currently doesn't support threadNumberLimit's modification
            grade: 0,
            problemId: problem.id,

            editing: true // new testcase --> editing it immediately
        });
        setTestcaseEdits([...testcaseEdits, newTestcaseEdit]);
        return newTestcaseEdit;
    };


    const generateNextTestcaseId = (testcaseEdits, id = 0) => {
        const idText = id.toString();
        if (testcaseEdits.find(t => t.id === idText)) {
            return generateNextTestcaseId(testcaseEdits, id + 1);
        }
        return idText;
    };

    const deleteTestcase = testcase => {
        setTestcaseEdits(testcasesList => testcasesList.filter(tc => tc.id !== testcase.id));
    };

    const initializeTestcases = (initialTestcases) => {
        currentTestcaseEdits = initialTestcases.map(testcase =>
            new TestcaseEdit({
                ...testcase,
                saved: true // old testcases --> should have been saved
            }));
        setTestcaseEdits(currentTestcaseEdits);
    };

    return {setProblem, testcaseEdits, initializeTestcases, addNewTestcase, deleteTestcase};
};

class TestcaseEdit {
    constructor({
                    id, problemId, name, timeLimit, memoryLimit, outputLimit,
                    threadNumberLimit, grade,
                    ioFileId, stdIn, stdOut, inputFiles, outputFiles,

                    // the manipulation of editing properties
                    saved = false, editing = false, edited = false, errorMessage, backup
                }) {

        this.id = id;
        this.problemId = problemId;
        if (name.length === 0) {
            this.nameErrorMessage = "The name must not be empty.";
        }
        if (currentTestcaseEdits.filter(t => t.id !== this.id).find(t => t.name === name)) {
            this.nameErrorMessage = "Testcase's name should not be duplicate.";
        }
        this.name = name;
        this.timeLimit = this._filterNumber(timeLimit, 1, 2000000000);
        this.memoryLimit = this._filterNumber(memoryLimit, 1, 2000000000);
        this.outputLimit = this._filterNumber(outputLimit, 1, 2000000000);
        this.threadNumberLimit = -1; // currently doesn't support threadNumberLimit's modification
        this.grade = this._filterNumber(grade, 0, 2000000000);
        this.ioFileId = ioFileId;
        this.stdIn = stdIn;
        this.stdOut = stdOut;
        this.inputFiles = inputFiles;
        this.outputFiles = outputFiles;

        this.saved = saved;
        this.editing = editing;
        this.edited = edited;
        this.errorMessage = errorMessage;

        this.backup = backup;
    }

    _filterNumber(number, min, max) {
        if (isNaN(number) || number < min) {
            return min;
        }
        if (number > max) {
            return max;
        }
        return number;
    }

    startEditing() {
        return this._newTestcaseEdit({...this, edited: false, editing: true, backup: this});
    }

    error(errorMessage) {
        return this._newTestcaseEdit({...this, errorMessage});
    }

    edit(edition) {
        return this._newTestcaseEdit({...this, ...edition, edited: true});
    }

    cancelEditing() {
        if (!this.editing) {
            throw new Error("You can only cancel the editing during the editing state.");
        }
        return this._newTestcaseEdit(this.backup);
    }

    save() {
        return this._newTestcaseEdit({...this, saved: true, editing: false});
    }

    hasError() {
        return this.nameErrorMessage;
    }

    delete() {
        currentTestcaseEdits = currentTestcaseEdits.filter(t => t.id !== this.id);
    }

    _newTestcaseEdit(editObj) {
        const index = currentTestcaseEdits.findIndex(t => t.id === this.id);
        const testcaseEdit = new TestcaseEdit(editObj);
        if (index === -1) {
            currentTestcaseEdits.push(testcaseEdit);
        } else {
            currentTestcaseEdits[index] = new TestcaseEdit(editObj);
        }
        return testcaseEdit;
    }
}

/**
 * Record the 'add file' and 'delete file' actions and finally create a TestcaseIosPatch that summarizes these actions.
 */
const useTestcaseIosPatch = (initialTestcase) => {
    const {files: inputFiles, addFiles: _addInputFiles, removeFile: _removeInputFile, reset: _resetInputFiles} =
        useUploads(initialTestcase.inputFiles ? initialTestcase.inputFiles.map(name => new FakeFile(name)) : []);
    const {files: outputFiles, addFiles: _addOutputFiles, removeFile: _removeOutputFile, reset: _resetOutputFiles} =
        useUploads(initialTestcase.outputFiles ? initialTestcase.outputFiles.map(name => new FakeFile(name)) : []);
    const {files: stdIns, setFiles: _setStandardInFiles, reset: _resetStandardInFiles} =
        useUploads(initialTestcase.stdIn ? [new FakeFile(initialTestcase.stdIn)] : []);
    const {files: stdOuts, setFiles: _setStandardOutFiles, reset: _resetStandardOutFiles} =
        useUploads(initialTestcase.stdOut ? [new FakeFile(initialTestcase.stdOut)] : []);
    const inFilesMap = useRef({});
    const outFilesMap = useRef({});
    const stdInFile = useRef(undefined);
    const stdOutFile = useRef(undefined);
    const deletedInFileNames = useRef(new Set());
    const deletedOutFileNames = useRef(new Set());

    const addInputFiles = inFiles => {
        for (const inFile of inFiles) {
            inFilesMap.current[inFile.name] = inFile;
        }
        _addInputFiles(inFiles);
    };
    const addOutputFiles = outFiles => {
        for (const outFile of outFiles) {
            outFilesMap.current[outFile.name] = outFile;
        }
        _addOutputFiles(outFiles);
    };
    const removeInputFile = filename => {
        if (inFilesMap.current[filename]) {
            delete inFilesMap.current[filename];
        } else {
            deletedInFileNames.current.add(filename);
        }
        _removeInputFile(filename);
    };
    const removeOutputFile = filename => {
        if (outFilesMap.current[filename]) {
            delete outFilesMap.current[filename];
        } else {
            deletedOutFileNames.current.add(filename);
        }
        _removeOutputFile(filename);
    };
    const setStandardInFile = stdIn => {
        stdInFile.current = stdIn;
        _setStandardInFiles([stdIn]);
    };
    const setStandardOutFile = stdOut => {
        stdOutFile.current = stdOut;
        _setStandardOutFiles([stdOut]);
    };


    const createTestcaseIOsPatch = () => {
        return new TestcaseIOsPatch({
            problemId: initialTestcase.problemId,
            testcaseId: initialTestcase.id,
            deletedIns: Array.from(deletedInFileNames.current),
            deletedOuts: Array.from(deletedOutFileNames.current),
            stdInFile: stdInFile.current,
            stdOutFile: stdOutFile.current,
            inFiles: Object.values(inFilesMap.current),
            outFiles: Object.values(outFilesMap.current),
        });
    };

    const reset = () => {
        commit();
        _resetInputFiles();
        _resetOutputFiles();
        _resetStandardInFiles();
        _resetStandardOutFiles();
    };

    const commit = () => {
        inFilesMap.current = {};
        outFilesMap.current = {};
        stdInFile.current = undefined;
        stdOutFile.current = undefined;
        deletedInFileNames.current = new Set();
        deletedOutFileNames.current = new Set();
    };

    return {
        createTestcaseIOsPatch, inputFiles, addInputFiles, removeInputFile,
        outputFiles, addOutputFiles, removeOutputFile,
        stdIns, setStandardInFile, stdOuts, setStandardOutFile, reset, commit
    }
};

export {useTestcaseEditList, useTestcaseIosPatch};

class FakeFile {
    constructor(name) {
        this.name = name;
    }
}
