import "./styles.css";

export default function itemList({ title, description }) {
    return (
        <div className="itemList">
            <strong>{title}</strong>
            <p>{description}</p>
            <hr />
        </div>
    );
}
