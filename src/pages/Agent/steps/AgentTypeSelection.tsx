import { AgentInfo, DeploymentType } from "@/service/agent.service";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";
import { Chip, Guard } from "../../../assets";
import { MainButton } from "../../../components/Button";
interface AgentTypeSelectionProps {
  onNext: () => void;
}

const AgentTypeSelection: FC<AgentTypeSelectionProps> = ({ onNext }) => {
  const { setValue, watch } = useFormContext<AgentInfo>();
  const types = [
    {
      code: DeploymentType.TEE,
      name: "Verifiable Agent",
      icon: (
        <div className="w-[213px] h-[213px] bg-primary-300 rounded-lg flex items-center justify-center">
          <Guard />
        </div>
      ),
      description:
        "Runs in a Trusted Execution Environment (TEE) like Intel SGX or AMD SEV. Guarantees no non-human/machine interference.",
    },
    {
      code: DeploymentType.NVM,
      name: "Non-verifiable Agent",
      icon: (
        <div className="w-[213px] h-[213px] bg-secondary-100 rounded-lg flex items-center justify-center">
          <Chip />
        </div>
      ),
      description:
        "Runs on standard hardware without guarantees of non-human/machine interference.",
    },
  ];
  return (
    <div className="text-center w-full">
      <p className="text-[64px] text-primary-300 my-10">Deploy Agent</p>
      <div className="grid grid-cols-2 gap-10 px-12">
        {types.map((type) => (
          <div
            key={type.code}
            onClick={() => setValue("deploymentType", type.code)}
            className={`flex flex-col border px-6 rounded-2xl bg-white
              ${watch("deploymentType") === type.code ? "border-primary-300/30" : ""}`}
          >
            <div className="flex justify-between gap-4 min-h-[267px] items-center">
              <div className="flex flex-col justify-between gap-3 items-start w-1/2 h-full py-7">
                <p className={`text-[28px] text-primary-300 text-left`}>
                  {type.name}
                </p>
                <p className={`text-[13px] text-primary-300 text-left`}>
                  {type.description}
                </p>
                <div>
                  <MainButton
                    className={`text-[14px] !py-2 ${watch("deploymentType") !== type.code
                        ? "!bg-background-grey !text-background-grey-tertiary"
                        : ""
                      }`}
                  >
                    Use it
                  </MainButton>
                </div>
              </div>
              <div className="text-primary-100">{type.icon}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-10">
        <MainButton
          onClick={onNext}
        >
          <div className="flex items-center gap-2">
            Next
            <FaArrowRight />
          </div>
        </MainButton>
      </div>
    </div>
  );
};

export default AgentTypeSelection;
