import { ProductPreview } from "@/components/feature/VendingMachine/PreviewProduct";
import { DialogPayment } from "@/components/feature/PaymentForm/DialogPayment";
import { ProductProvider } from "@/contexts/ProductContext";
import { MoneySection } from "@/components/feature/PaymentForm/MoneySection";
import { MoneySectionContextProvider } from "@/contexts/MoneySectionContext";

const Home = () => {
  return (
    <div className="bg-gradient-to-br md:flex flex flex-col items-center h-auto lg:flex-row justify-center gap-4 xl:gap-10 2xl:gap-11 w-full p-4 from-blue-500 via-violet-200 to-purple-400 text-neutral-100">
      <ProductProvider>
        <MoneySectionContextProvider>
          <div className="flex flex-row gap-3">
            <DialogPayment />
            <div className="w-full flex justify-center flex-col md:w-[870px] rounded-lg h-full p-3 bg-opacity-45 bg-blend-hard-light bg-sky-100">
              <div className="flex mb-2 justify-center">
                <div className="sm:text-base md:text-xl font-bold">
                  Blue Vending Machine
                </div>
              </div>
              <ProductPreview />
            </div>
            <div className="flex justify-center flex-col w-[] rounded-lg h-full p-3 bg-opacity-45 bg-blend-hard-light bg-sky-100">
              <MoneySection />
            </div>
          </div>
        </MoneySectionContextProvider>
      </ProductProvider>
    </div>
  );
};

export default Home;
