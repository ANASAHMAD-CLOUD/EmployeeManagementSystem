import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export const DataTable = ({ noticedata }) => {
  console.log("This is notice data", noticedata);
  const Notices = [
    // {
    //     invoice: "INV001",
    //     paymentStatus: "Paid",
    //     totalAmount: "$250.00",
    //     paymentMethod: "Credit Card",
    // },
    // {
    //     invoice: "INV002",
    //     paymentStatus: "Pending",
    //     totalAmount: "$150.00",
    //     paymentMethod: "PayPal",
    // },
    // {
    //     invoice: "INV003",
    //     paymentStatus: "Unpaid",
    //     totalAmount: "$350.00",
    //     paymentMethod: "Bank Transfer",
    // },
    // {
    //     invoice: "INV004",
    //     paymentStatus: "Paid",
    //     totalAmount: "$450.00",
    //     paymentMethod: "Credit Card",
    // },
    // {
    //     invoice: "INV005",
    //     paymentStatus: "Paid",
    //     totalAmount: "$550.00",
    //     paymentMethod: "PayPal",
    // },
    // {
    //     invoice: "INV006",
    //     paymentStatus: "Pending",
    //     totalAmount: "$200.00",
    //     paymentMethod: "Bank Transfer",
    // },
    // {
    //     invoice: "INV007",
    //     paymentStatus: "Unpaid",
    //     totalAmount: "$300.00",
    //     paymentMethod: "Credit Card",
    // },
    // {
    //     invoice: "INV008",
    //     paymentStatus: "Paid",
    //     totalAmount: "$550.00",
    //     paymentMethod: "PayPal",
    // },
    // {
    //     invoice: "INV009",
    //     paymentStatus: "Pending",
    //     totalAmount: "$200.00",
    //     paymentMethod: "Bank Transfer",
    // },
    // {
    //     invoice: "INV010",
    //     paymentStatus: "Unpaid",
    //     totalAmount: "$300.00",
    //     paymentMethod: "Credit Card",
    // },
    // {
    //     invoice: "INV011",
    //     paymentStatus: "Paid",
    //     totalAmount: "$550.00",
    //     paymentMethod: "PayPal",
    // },
    // {
    //     invoice: "INV012",
    //     paymentStatus: "Pending",
    //     totalAmount: "$200.00",
    //     paymentMethod: "Bank Transfer",
    // },
    // {
    //     invoice: "INV013",
    //     paymentStatus: "Unpaid",
    //     totalAmount: "$300.00",
    //     paymentMethod: "Credit Card",
    // },
    // {
    //     invoice: "INV014",
    //     paymentStatus: "Paid",
    //     totalAmount: "$550.00",
    //     paymentMethod: "PayPal",
    // },
    // {
    //     invoice: "INV015",
    //     paymentStatus: "Pending",
    //     totalAmount: "$200.00",
    //     paymentMethod: "Bank Transfer",
    // },
    // {
    //     invoice: "INV016",
    //     paymentStatus: "Unpaid",
    //     totalAmount: "$300.00",
    //     paymentMethod: "Credit Card",
    // },
    // {
    //     invoice: "INV017",
    //     paymentStatus: "Paid",
    //     totalAmount: "$550.00",
    //     paymentMethod: "PayPal",
    // },
    // {
    //     invoice: "INV018",
    //     paymentStatus: "Pending",
    //     totalAmount: "$200.00",
    //     paymentMethod: "Bank Transfer",
    // },
    // {
    //     invoice: "INV019",
    //     paymentStatus: "Unpaid",
    //     totalAmount: "$300.00",
    //     paymentMethod: "Credit Card",
    // },
    // {
    //     invoice: "INV020",
    //     paymentStatus: "Paid",
    //     totalAmount: "$550.00",
    //     paymentMethod: "PayPal",
    // },
    // {
    //     invoice: "INV021",
    //     paymentStatus: "Pending",
    //     totalAmount: "$200.00",
    //     paymentMethod: "Bank Transfer",
    // },
    // {
    //     invoice: "INV022",
    //     paymentStatus: "Unpaid",
    //     totalAmount: "$300.00",
    //     paymentMethod: "Credit Card",
    // },
  ];

  if (noticedata) {
    for (let index = 0; index < noticedata.notices.length; index++) {
      console.log("This is notice data", noticedata.notices);
      Notices.push({
        noticeID: index + 1,
        noticeTitle: noticedata.notices[index].title,
        noticeAudience: noticedata.notices[index].audience,
        noticeCreatedBy: `${noticedata.notices[index].createdby["firstname"]} ${noticedata.notices[index].createdby["lastname"]}`,
      });
    }
  }

  console.log("Notice array", Notices);

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white p-3 shadow-[0_14px_34px_-22px_rgba(15,23,42,0.35)] sm:p-4">
      <div className="mb-3 flex items-center justify-between px-1">
        <div>
          <p className="text-lg font-semibold text-slate-900">Recent Notices</p>
          <p className="text-sm text-slate-500">
            Latest updates from the HR team
          </p>
        </div>
        <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Updates
        </div>
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Notice ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Audience</TableHead>
              <TableHead className="text-right">Created By</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Notices.map((Notice) => (
              <TableRow key={Notice.noticeID} className="hover:bg-slate-50">
                <TableCell className="font-medium">{Notice.noticeID}</TableCell>
                <TableCell>{Notice.noticeTitle}</TableCell>
                <TableCell>{Notice.noticeAudience}</TableCell>
                <TableCell className="text-right">
                  {Notice.noticeCreatedBy}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
