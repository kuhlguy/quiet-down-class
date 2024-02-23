export default function Light(props) {
    
    const on = props.on
    const color =  on ? 'light glow '+props.color : 'light'
    let emoji
    switch (props.color) {
        case 'red':
          emoji = on ? "sentiment_stressed" : ""
          break;
        case 'yellow':
          emoji = on ? "sentiment_neutral" : ""
          break;
        case 'green':
            emoji = on ? "sentiment_calm" : ""
            break;
        default:
      }

    return (
    <div>
        <div className={color}>
            <div className="emoji">
                <span className="material-symbols-outlined">
                    {emoji}
                </span>
            </div>
        </div>
    </div>
    )
}