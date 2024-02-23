export default function ToggleSwitch(props) {

    return (
        <div>
            <p>Use Positive Reinforcement Messages?</p>
            <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
            </label>
        </div>
    )
}