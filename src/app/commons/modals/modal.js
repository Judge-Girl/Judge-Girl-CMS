import * as React from "react";



const renderModal = function({contentRendering, show, closeIconRef, onClose}) {
    return (
        <div className={`modal ${show ? 'is-active' : ''}`}>
            <div className="modal-background"/>
            <div id="modal-card" className="font-poppins modal-card">
                <section className="modal-card-body has-text-centered">
                    <button id="close-btn" className="delete m-2" ref={closeIconRef}
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
