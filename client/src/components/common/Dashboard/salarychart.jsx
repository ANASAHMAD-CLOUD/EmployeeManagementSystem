import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export const SalaryChart = ({ balancedata }) => {
  const chartData = [];
  if (balancedata) {
    for (let index = 0; index < balancedata.balance.length; index++) {
      chartData.push({
        month: balancedata.balance[index]["expensemonth"],
        SalriesPaid: balancedata.balance[index]["totalexpenses"],
        AvailableAmount: balancedata.balance[index]["availableamount"],
      });
    }
  }
  const chartConfig = {
    desktop: {
      label: "Salaries Paid",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Available Balance",
      color: "hsl(var(--chart-2))",
    },
  };

  let trendingUp = 0;

  if (chartData.length > 1) {
    const last = chartData[chartData.length - 1];
    const prev = chartData[chartData.length - 2];
    const difference = last.AvailableAmount - prev.AvailableAmount;
    trendingUp += Math.round((difference * 100) / prev.AvailableAmount);
  }
  return (
    <div className="flex h-auto flex-col gap-3">
      <div className="px-2">
        <h1 className="text-xl font-bold sm:text-start xl:text-2xl">
          Balance Chart
        </h1>
      </div>
      <Card className="mx-0 overflow-hidden border-cyan-100 shadow-[0_14px_34px_-22px_rgba(15,23,42,0.35)]">
        <div className="bg-slate-900 px-4 py-3 text-white">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">
                Available balance
              </p>
              <p className="text-lg font-semibold">
                {chartData.length > 0
                  ? chartData[chartData.length - 1]["AvailableAmount"]
                  : 0}
              </p>
            </div>
            <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
              {chartData.length > 0 ? "Updated" : "No data"}
            </div>
          </div>
        </div>
        <CardHeader className="px-4 pb-2 pt-4">
          <CardTitle className="text-base sm:text-lg">
            Salaries overview
          </CardTitle>
          <CardDescription className="text-sm text-slate-600">
            Track spending and remaining balance across recent months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent indicator="line" className="p-2" />
                }
                className="p-[2px] flex gap-1 items-center min-[250px]:text-xs sm:text-xs"
              />
              <Area
                dataKey="SalriesPaid"
                type="natural"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="AvailableAmount"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="px-4 pb-4">
          <div className="flex w-full items-start gap-2 rounded-2xl bg-slate-50 p-3 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-semibold leading-none text-slate-700">
                Trending up by {trendingUp} % this month
                <TrendingUp className="h-4 w-4 text-cyan-600" />
              </div>
              <div className="flex items-center gap-2 leading-none text-slate-500">
                {chartData.length > 0
                  ? `${chartData[0]["month"]} 2024 - ${chartData[chartData.length - 1]["month"]} 2024`
                  : null}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
