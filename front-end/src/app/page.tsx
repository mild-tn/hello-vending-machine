import { ProductPreview } from "@/components/feature/VendingMachine/PreviewProduct";
import { DialogPayment } from "@/components/feature/PaymentForm/DialogPayment";
import { ProductProvider } from "@/contexts/ProductContext";
import { MoneySection } from "@/components/feature/CustomerSection/MoneySection";
import { MoneySectionContextProvider } from "@/contexts/MoneySectionContext";
import { TransactionList } from "@/components/feature/CustomerSection/TrasactionList";

const Home = () => {
  return (
    <div className="bg-gradient-to-br md:flex flex flex-col md:h-vh xl:h-dvh lg:flex-row justify-center gap-4 xl:gap-10 2xl:gap-11 w-full p-4 from-blue-500 via-violet-200 to-purple-400 text-neutral-100">
      <ProductProvider>
        <MoneySectionContextProvider>
          <div className="flex flex-row h-fit gap-3">
            <DialogPayment />
            <div className="w-full flex justify-center flex-col xl:w-[840px] rounded-lg h-full p-3 bg-opacity-45 bg-blend-hard-light bg-sky-100">
              <div className="flex mb-2 justify-center">
                <div className="sm:text-base md:text-xl font-bold">
                  Blue Vending Machine
                </div>
              </div>
              <ProductPreview />
            </div>
            <div className="flex justify-center flex-col rounded-lg h-full p-3 bg-opacity-45 bg-blend-hard-light bg-sky-100">
              <MoneySection />
              <p className="text-lg2 text-slate-600 my-3">Transaction List</p>
              <div className="overflow-y-auto md:h-[50dvh] lg:h-[33dvh] xl:h-[56dvh]">
                <TransactionList />
              </div>
            </div>
          </div>
        </MoneySectionContextProvider>
      </ProductProvider>
    </div>
  );
};

export default Home;
