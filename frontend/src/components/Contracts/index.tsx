import "./styles.css"

interface ContractProps  {
    contract: Contract;
}

const Contract: React.FC<ContractProps> = (
    { contract }
) => {
    return (
        <div className="contract">
            <h3> Contract {contract["internal_id"]}</h3>
            <p> Awarded to: {contract["Recipient Name"]}</p>
            <p> Awarded by: {contract["Awarding Agency"]}</p>
            <p> Funded by: {contract["Funding Agency"]}</p>
            <p> Award Amount: {contract["Award Amount"]}</p>
            <p> End Date: {contract["End Date"]}</p>
        </div>
    );
};


export default Contract;