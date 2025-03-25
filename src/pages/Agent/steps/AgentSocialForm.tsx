import FormField from "@/components/FormField";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FaArrowLeft, FaTelegramPlane } from "react-icons/fa";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";
import { MainButton } from "../../../components/Button";
import DefaultAvatar from "@/assets/images/default-avt.png";
import { AgentInfo } from "@/service/agent.service";
interface AgentSocialFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  isSubmitting: boolean;
  isEdit?: boolean;
}

const AgentSocialForm: FC<AgentSocialFormProps> = ({
  onSubmit,
  onBack,
  isSubmitting,
  isEdit,
}) => {
  const { register, handleSubmit, getValues } = useFormContext<AgentInfo>();

  return (
    <div>
      <div
        className={`flex items-center ${isEdit ? "justify-between mb-10" : ""}`}
      >
        {isEdit && (
          <div className="flex gap-4 items-center">
            <img
              src={getValues("avatar") || DefaultAvatar}
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <p className="text-5xl text-text-secondary">
              {getValues("agentName")}
            </p>
          </div>
        )}
        <div className="flex gap-4 items-center">
          <p className="text-[32px] my-3 bg-gradient-to-r from-[#00CCAB] to-[#CB99D0] text-transparent bg-clip-text">
            Integration
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 px-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <FormField
              label={
                <p className="text-text-secondary mb-2 flex items-center gap-2 text-[21px]">
                  <FaXTwitter className="text-text-secondary" />
                  Twitter (X)
                </p>
              }
              name="twitter"
              placeholder="Enter a URL"
              register={register}
              colorScheme="primary"
              prefixLabel={false}
            />

            <FormField
              label={
                <p className="text-text-secondary mb-2 flex items-center gap-2 text-[21px]">
                  <FaTelegramPlane className="text-text-secondary" />
                  Telegram
                </p>
              }
              name="telegram"
              placeholder="Enter a URL"
              register={register}
              colorScheme="primary"
              prefixLabel={false}
            />

            <FormField
              label={
                <p className="text-text-secondary mb-2 flex items-center gap-2 text-[21px]">
                  <FaDiscord className="text-text-secondary" />
                  Discord
                </p>
              }
              name="discord"
              placeholder="Enter a URL"
              register={register}
              colorScheme="primary"
              prefixLabel={false}
            />
          </div>
        </form>
      </div>

      <div className="flex justify-between mt-10">
        <button
          type="button"
          onClick={onBack}
          className="p-4 bg-white rounded-full cursor-pointer"
        >
          <FaArrowLeft className="text-primary-200 text-2xl" />
        </button>
        <MainButton
          onClick={onSubmit}
          className="px-25"
          isLoading={isSubmitting}
        >
          <div className="flex items-center gap-2">
            {isEdit ? "Update" : "Create"}
          </div>
        </MainButton>
      </div>
    </div>
  );
};

export default AgentSocialForm;
