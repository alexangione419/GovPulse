import "./styles.css"

interface GrantProps {
    grant: Grant;
}

const Grant: React.FC<GrantProps> = (
    {grant}
) => {

    return (
        <div className="grant">
            <h3> GRANT: {grant.title}</h3>
            <p> Agency: {grant.agency}</p>
            <p> Close Date: {new Date(grant.closeDate).toLocaleDateString()}</p>
        </div>
    );

};


export default Grant;