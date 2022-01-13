

function SaleComponent(prop){
    return(
        <div className={prop.class}>
            <div className={"saleDescription"}>
                    {prop.sale.description}
            </div>
            <div>
                <text className={"saleTitles"}>
                    Start time:
                </text>
                <text>
                    {prop.sale.startTime}
                </text>
            </div>
            <div>
                <text className={"saleTitles"}>
                    End time:
                </text>
                <text>
                    {prop.sale.endTime}
                </text>
            </div>
        </div>
    )
}

export default SaleComponent