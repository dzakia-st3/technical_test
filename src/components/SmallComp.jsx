export const Text = (text, bg, color, size) => {
    return (
        <div className={`${bg} text-${color} text-${size} font-bold`}>{text}</div>
    )
}