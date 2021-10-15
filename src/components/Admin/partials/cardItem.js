function CardItem({src, title, subTitle, btnText, linkBtn = '#', subTitle1}) {
    return (
        <div className="row border border-secondary p-2 rounded-3 shadow-sm mb-4">
            <div className="col-2 p-0">
                <img src={src} width="160"/>
            </div>
            <div className="col-7">
                <h3 className="text-w-dots">{title}</h3>
                <span className="text-h-dots">{subTitle}</span>
                <span className="text-h-dots">{subTitle1}</span>
            </div>
            <div className="col-3 p-2 d-flex justify-content-end align-items-end">
                <a href={linkBtn} className="btn btn-default text-white" variant="primary">
                    {btnText}
                </a>
            </div>
        </div>
    );
}

export default CardItem;