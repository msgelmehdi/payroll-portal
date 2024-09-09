import { Row, Select } from "antd";
import type { Dayjs } from "dayjs";

interface HeaderRenderProps {
  value: Dayjs;
  onChange: (date: Dayjs) => void;
}

const { Option } = Select;
export const CalendarHeaderRender = ({
  value,
  onChange,
}: HeaderRenderProps) => {
  const year = value.year();

  return (
    <Row justify="center">
      <Select
        value={year}
        onChange={(e) => {
          const newYear = parseInt(e.toString(), 10);
          const newValue = value.clone().year(newYear);
          onChange(newValue);
        }}
      >
        {Array.from({ length: 150 }, (_, i) => (
          <Option key={i} value={i + 1970}>
            {i + 1970}
          </Option>
        ))}
      </Select>
    </Row>
  );
};

export default CalendarHeaderRender;
