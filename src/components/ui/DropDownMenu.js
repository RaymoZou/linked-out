
export default function DropDownMenu(props) {
    return <>
        {props.isOpen ?
            <div >
                <div >
                    {props.children}
                </div>
            </div>
            :
            null}
    </>
}
