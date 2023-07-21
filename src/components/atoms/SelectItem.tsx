import { Select } from "antd";

interface ISelectItem {
    onChange: ((value: string, option: {
        key: number;
        value: string;
        label: string;
    } | {
        key: number;
        value: string;
        label: string;
    }[]) => void) | undefined,
    options: {
        key: number;
        value: string;
        label: string;
    }[] | undefined
}

export const SelectItem = (props: ISelectItem) => {
    const { onChange, options } = props;

    return (
        <Select
            allowClear
            style={{ width: 120 }}
            onChange={onChange}
            options={options}
        />
    )
}