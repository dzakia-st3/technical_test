const Text = (text, bg, color) => {
    return (
        <div className={`${bg} text-${color}-600 text-lg font-bold`}>{text}</div>
    )
}

export default { Text }

