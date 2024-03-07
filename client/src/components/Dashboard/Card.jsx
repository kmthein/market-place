import { Badge, Card, Metric, Text } from '@tremor/react';

const CustomCard = ({ title, count, icon, note }) => {
  return (
    <Card
      className="mx-auto max-w-sm"
    >
    <div className="flex items-center justify-between">
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">{title}</p>
      <Badge icon={icon}>{note}</Badge>
      </div>
      <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{count}</p>
    </Card>
  );
}

export default CustomCard;