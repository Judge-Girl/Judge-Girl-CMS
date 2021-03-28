import * as React from "react";



const renderModal = function({modalClassName, modalWidth, contentRendering, show, closeIconRef, onClose}) {
    return (
        <div className={`${modalClassName} modal ${show ? 'is-active' : ''}`}>
            <div className="modal-background"/>
            <div className="font-poppins modal-card"
                 style={{width: modalWidth, borderRadius: "10px"}}>
                <section className="modal-card-body has-text-centered p-0">
                    <button className="delete m-2" ref={closeIconRef}
                            style={{float: "right"}}
                            aria-label="close" onClick={e => onClose()}/>
                    <div>
                        {contentRendering()}
                    </div>
                </section>

            </div>
        </div>
    );
};


export {renderModal};
