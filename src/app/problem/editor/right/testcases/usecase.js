import {useRef, useState} from "react";
import {useUploads} from "../../../../usecases/UploadFilesUseCase";
import {TestcaseIOsPatch} from "../../../../../services/ProblemService";

const useTestcaseList = (problem) => {
    const [testcases, setTestcases] = useState([]);

    const addNewTestcase = () => {
        const nextId = testcases ? Math.max(...testcases.map(t => t.id)) + 1 : 0;
        setTestcases([...testcases,
            {
                id: nextId,
                name: nextId,
                timeLimit: 0,
                memoryLimit: 0,
                outputLimit: 0,
                threadNumberLimit: -1,
                grade: 0,
                problemId: problem.id,

                // the manipulation state of a testcase
                saved: false, // new testcase --> not saved yet
                editing: true // new testcase --> is under editing
            }]);
    };

    const deleteTestcase = testcase => {
        setTestcases(testcasesList => testcasesList.filter(tc => tc.id !== testcase.id));
    };

    const initializeTestcases = testcases => {
        for (const testcase of testcases) {
            testcase.saved = true; // old testcases --> should have been saved
        }
        setTestcases(testcases);
    };

    const updateTestcase = (testcaseId, update) => {
        const newTestcases = [...testcases];
        for (let i = 0; i < newTestcases.length; i++) {
            if (newTestcases[i].id === testcaseId) {
                newTestcases[i] = update(newTestcases[i]);
                newTestcases[i].saved = true; // testcase updated --> should have been saved
                break;
            }
        }
        setTestcases(newTestcases);
    };

    return {testcases, initializeTestcases, addNewTestcase, updateTestcase, deleteTestcase};
};

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
        _resetInputFiles();
        _resetOutputFiles();
        _resetStandardInFiles();
        _resetStandardOutFiles();
    };

    return {
        createTestcaseIOsPatch, inputFiles, addInputFiles, removeInputFile,
        outputFiles, addOutputFiles, removeOutputFile,
        stdIns, setStandardInFile, stdOuts, setStandardOutFile, reset
    }
};

export {useTestcaseList, useTestcaseIosPatch};

class FakeFile {
    constructor(name) {
        this.name = name;
    }
}
