import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { MainButton } from "../../../components/Button";
import { Blink, Block, DiamondStyle, UserCheck } from "@/assets";
import FormSection from "@/components/FormSection";
import FormField from "@/components/FormField";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { AgentInfo } from "@/service/agent.service";
import DefaultAvatar from "@/assets/images/default-avt.png";

interface AgentInfoFormProps {
  onNext: () => void;
  onBack: () => void;
  isEdit?: boolean;
}

const AgentInfoForm: FC<AgentInfoFormProps> = ({ onNext, onBack, isEdit }) => {
  const { register, getValues } = useFormContext<AgentInfo>();

  return (
    <div>
      <div className={`flex items-center ${isEdit ? "justify-between mb-10" : ""}`}>
        {isEdit && (
          <div className="flex gap-4 items-center">
            <img
              src={getValues("avatar") || DefaultAvatar}
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <p className="text-5xl text-text-secondary">{getValues("agentName")}</p>
          </div>
        )}
        <div className="flex gap-4 items-center">
          <Blink />
          <p className="text-[32px] my-3 bg-gradient-to-r from-[#00CCAB] to-[#CB99D0] text-transparent bg-clip-text">
            {isEdit ? "Formulate Your Agent" : "Create Agent"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 px-8">
        <div>
          <FormSection icon={<UserCheck />} title="Character Details">
            {!isEdit && (
              <FormField
                label="Name"
                name="agentName"
                placeholder="Enter the agent's name."
                register={register}
                helperText="Name your agent"
                colorScheme="primary"
              />
            )}

            <FormField
              label="Biography"
              name="bio"
              placeholder="Write a brief bio of your agent (max 200 words)."
              register={register}
              helperText="Create a short bio to introduce your agent."
              isTextArea
              colorScheme="primary"
            />

            <FormField
              label="Description"
              name="description"
              placeholder="Tell us the reasons it was born, what it can do, how it performs the tasks, and whatever you want"
              register={register}
              helperText="Describe your agent's story"
              isTextArea
              colorScheme="primary"
            />
          </FormSection>

          <FormSection icon={<Block />} title="Specialization" className="mt-8">
            <FormField
              label="Topic"
              name="topics"
              placeholder="Enumerate the topics your agent is passionate about. For example: DeFi, GameFi, NFT, Sports, Movies"
              register={register}
              colorScheme="secondary"
            />

            <FormField
              label="Primary Functions"
              name="primaryFunction"
              placeholder="Set what the agent specializes in. Clarifies the agent's main capabilities. For example: Analyze, Predict, Answer questions"
              register={register}
              colorScheme="secondary"
            />

            <FormField
              label="Goal"
              name="goal"
              placeholder="Defines the agent's objectives. For example: Answer all questions from patients and direct them to the doctor if questions fall out of the questions and answers banks or if perceive urgent/important situations.  "
              register={register}
              isTextArea
              colorScheme="secondary"
            />

            <FormField
              label="Mission"
              name="mission"
              placeholder="For example: To help the doctor reduce the load of work and focus on human-need situations. To help patients understand their situations. "
              register={register}
              isTextArea
              colorScheme="secondary"
            />
          </FormSection>

          <FormSection icon={<DiamondStyle />} title="Style" className="mt-8">
            <FormField
              label="General Style"
              name="generalStyle"
              placeholder="Outline the agent's general communication style. Mention speech patterns, mannerisms, and common expressions."
              register={register}
              isTextArea
              colorScheme="success"
            />

            <FormField
              label="Chat Style"
              name="chatStyle"
              placeholder="Describe your agent's conversational behaviors. Include examples of typical responses, tone, quirks, and other chat-specific elements."
              register={register}
              isTextArea
              colorScheme="success"
            />

            <FormField
              label="Post Style"
              name="postStyle"
              placeholder="Detail the agent's approach to writing posts or long-form content. Include their formatting preferences and overall writing style."
              register={register}
              isTextArea
              colorScheme="success"
            />
          </FormSection>
        </div>
      </div>
      <div className="flex justify-between mt-10">
        <button
          type="button"
          onClick={onBack}
          className="p-4 bg-white rounded-full cursor-pointer"
        >
          <FaArrowLeft className="text-primary-200 text-2xl" />
        </button>
        <MainButton onClick={onNext}>
          <div className="flex items-center gap-2">
            Next
            <FaArrowRight />
          </div>
        </MainButton>
      </div>
    </div>
  );
};

export default AgentInfoForm;
