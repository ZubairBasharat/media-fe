
type Props = {
    name?: string,
    value?: any
}

const ViewListItem = (props: Props) => {
    const { name, value } = props || {}
    return (
        <div className="flex w-full">
            <div className="basis-1/2 font-bold">{name}</div>
            <div className="basis-1/2"><span className="mr-2">:</span>{value}</div>
        </div>
    )
}

export default ViewListItem