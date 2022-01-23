

function SaleComponent(prop){
    return(
        <div className={prop.class}>
            <div className={"saleDescription"}>
                    {prop.sale.description}
            </div>
            <div>
                <text className={"saleTitles"}>
                    Start time:{" "}
                </text>
                <text>
                    {new Date(prop.sale.startTime).toDateString()}
                </text>
            </div>
            <div>
                <text className={"saleTitles"}>
                    End time:{" "}
                </text>
                <text>
                    {new Date(prop.sale.endTime).toDateString()}
                </text>
            </div>
        </div>
    )
}

export default SaleComponent