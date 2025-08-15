import "./styles.css"

interface OpportunityProps {
    opportunity: Opportunity;
}

const Grant: React.FC<OpportunityProps> = (
    { opportunity }
) => {

    return (
        <div className="opportunity">
            <h3>{opportunity.type}: {opportunity.title}</h3>
            <p>Active: {opportunity.active}</p>
            <p>Posted Date: {opportunity.postedDate}</p>
            <p>NAICS Code: {opportunity.naicsCode}</p>
        </div>
    );

};


export default Grant;