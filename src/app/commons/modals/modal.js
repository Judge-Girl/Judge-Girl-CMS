import * as React from "react";



const renderModal = function({modalClassName, modalWidth, contentRendering, show, closeIconRef, onClose}) {
    return (
        <div className={`${modalClassName} modal ${show ? 'is-active' : ''}`}>
            <div className="modal-background"/>
            <div id="modal-card" className="font-poppins modal-card" style={{width: modalWidth}}>
                <section className="modal-card-body has-text-centered p-0">
                    <button className="delete m-2" ref={closeIconRef}
                            style={{float: "right"}}
                            aria-label="close" onClick={e => onClose()}/>
                    <div className="p-5">
                        {contentRendering()}
                    </div>
                </section>

            </div>
        </div>
    );
};


export {renderModal};
