import "./styles.css"

interface GrantProps {
    grant: Grant;
}

const Grant: React.FC<GrantProps> = (
    { grant }
) => {

    return (
        <div className="grant">
            <h3> GRANT: {grant.title}</h3>
            <p> Agency: {grant.agency}</p>
            <p> Agency Code: {grant.agencyCode} </p>
            <p> Grant Status: {grant.oppStatus.toLocaleUpperCase()}</p>
            <p> Open Date: {grant.openDate == "" ? "N/A" : grant.openDate}</p>
            <p> Close Date: {grant.closeDate == "" ? "N/A" : grant.closeDate}</p>
        </div>
    );

};


export default Grant;