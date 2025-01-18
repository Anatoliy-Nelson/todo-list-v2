import * as React from "react";
import type {ChangeEvent} from "react";

type Props = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({title, changeTitle}: Props) => {

    const [isEditMode, setIsEditMode] = React.useState(false)
    const [itemTitle, setItemTitle] = React.useState(title)

    const onEditMode = () => {
        setIsEditMode(true)
    }

    const offEditMode = () => {
        setIsEditMode(false)
        changeTitle(itemTitle)
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    return (
        isEditMode
            ? <input value={itemTitle}
                     autoFocus
                     onChange={changeItemTitleHandler}
                     onBlur= {offEditMode}
             />
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
}