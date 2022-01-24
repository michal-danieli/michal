

function SaleComponent(prop){
    return(
        <div className={prop.class}>
            <div className={"saleDescription"}>
                    {prop.sale.description}
            </div>
            <div className={"time"}>
                <text className={"saleTitles"}>
                    Start time:{" "}
                </text>
                <text>
                    <div>
                        Time: {new Date(prop.sale.startTime).toLocaleTimeString()}
                    </div>
                    <div>
                        Date: {new Date(prop.sale.startTime).toDateString()}
                    </div>
                </text>
            </div>
            <div className={"time"}>
                <text className={"saleTitles"}>
                    End time:{" "}
                </text>
                <text>
                    <div>
                        Time: {new Date(prop.sale.endTime).toLocaleTimeString()}
                    </div>
                    <div>
                        Date: {new Date(prop.sale.endTime).toDateString()}
                    </div>
                </text>
            </div>
        </div>
    )
}

export default SaleComponent