
const ServerComponent = ({ text }: { text: string }) => {

    const d = (() => {});

    return (
        <div onClick={d} className="border border-rose-500 px-8 py-4 my-4">
            This is server component

            <p>{text}</p>
        </div>
    )
}

export default (ServerComponent);
