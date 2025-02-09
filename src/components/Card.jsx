import PropTypes from "prop-types"

export function Card1({ data }) {
    return (
        <div className="w-full flex justify-between items-center py-5">
            <div className="flex flex-col gap-3">
                {data?.map((item, idx) => (
                    <div className="text-slate-500 text-base" key={`title${idx}`}>{item.title}</div>
                ))}
            </div>
            <div className="flex flex-col gap-3 text-right">
                {data?.map((item, idx) => (
                    <div className={`${item.color ? item.color : 'text-slate-900'} text-base`} key={`content${idx}`}>{item.content}</div>
                ))}
            </div>
        </div>
    )
}

Card1.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            content: PropTypes.string,
            color: PropTypes.string
        })
    ).isRequired
}


export function Card2({ data }) {
    return (
        <div className="flex gap-3">
            <span className="material-symbols-outlined text-slate-500" key='icon'>{data[0]}</span>
            <div className="text-black text-base font-bold" key='info'>{data[1]}</div>
            <div className="text-slate-500 text-base" key='content'>{data[2]}</div>
        </div>
    )
}

Card2.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired
}