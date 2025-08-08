import "./styles.css"

interface OpportunityProps {
    opportunity: Opportunity;
}

const Grant: React.FC<OpportunityProps> = (
    { opportunity }
) => {

    return (
        <div className="opportunity">
            <h3>{opportunity.title}</h3>
            <p>Agency: {opportunity.noticeId}</p>
        </div>
    );

};


export default Grant;