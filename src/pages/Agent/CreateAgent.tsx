import { FC, useEffect, useState } from "react";

import { agentService, CreateAgentInfo, DeploymentType } from "@/service/agent.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import AgentInfoForm from "./steps/AgentInfoForm";
import AgentSocialForm from "./steps/AgentSocialForm";
import AgentTypeSelection from "./steps/AgentTypeSelection";
import { toaster } from "@/components/ui/toaster";

const agentSchema = yup.object().shape({
 
});

const CreateAgent: FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm<CreateAgentInfo>({
    resolver: yupResolver(agentSchema) as unknown as Resolver<CreateAgentInfo>,
    defaultValues: {
      deploymentType: DeploymentType.TEE,
    },
    
  });
  const onSubmit = async (data: CreateAgentInfo) => {
    try {
      setIsSubmitting(true);
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined && value !== "")
      );
      await agentService.createAgent({
        aiAgentDto: {...filteredData, category: [filteredData.topics as string]}
      });
      // Navigate to success page or agent list
      navigate('/');
    } catch (error) {
      console.error('Failed to create agent:', error);
      toaster.create({
        title: "Failed to create agent",
        description: error as string,
      })
    } finally {
      setIsSubmitting(false);
    }
  };
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AgentTypeSelection onNext={nextStep} />;
      case 2:
        return <AgentInfoForm onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <AgentSocialForm onSubmit={methods.handleSubmit(onSubmit)} onBack={prevStep} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };


  const steps = [
    {
      step: 1,
      label: "Choose Agent Type",
    },
    {
      step: 2,
      label: "Formulate Your Agent",
    },
    {
      step: 3,
      label: "Integration",
    },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentStep]);

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="rounded-lg p-6">
        <div className="mb-2">
          <div className="flex justify-between items-center bg-white rounded-full p-2 px-3 gap-8">
            {steps.map((item) => (
              <div key={item.step} className="flex items-center w-1/3">
                <div
                  className={`rounded-full w-full flex items-center justify-center text-lg font-semibold px-4 py-3 ${item.step === currentStep
                      ? "bg-primary-300 text-primary-100"
                      : "bg-background-grey text-primary-300/75"
                    }`}
                >
                  <div
                    className={`${item.step === currentStep
                        ? "text-primary-300"
                        : "text-primary-300/75"
                      } p-2 rounded-full bg-white mr-2 w-12 h-12 flex items-center justify-center`}
                    style={{
                      background:
                        item.step === currentStep
                          ? "linear-gradient(to right, #35FFD3, #DEA5E3)"
                          : "white",
                    }}
                  >
                    {item.step}
                  </div>{" "}
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-6">
            <div
              className={`w-4 h-4 rounded-full ${currentStep === 1 ? "bg-background-grey-secondary" : "bg-white"
                } mx-2`}
            ></div>
            <div
              className={`w-4 h-4 rounded-full ${currentStep === 2 ? "bg-background-grey-secondary" : "bg-white"
                } mx-2`}
            ></div>
            <div
              className={`w-4 h-4 rounded-full ${currentStep === 3 ? "bg-background-grey-secondary" : "bg-white"
                } mx-2`}
            ></div>
          </div>
        </div>
        <FormProvider {...methods}>
          {renderStep()}
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateAgent;
