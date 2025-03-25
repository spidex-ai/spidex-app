import { FC, useEffect, useState } from "react";

import { AgentInfo, agentService } from "@/service/agent.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import AgentInfoForm from "./steps/AgentInfoForm";
import AgentSocialForm from "./steps/AgentSocialForm";
import { toaster } from "@/components/ui/toaster";
const agentSchema = yup.object().shape({});

const EditAgent: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [agent, setAgent] = useState<AgentInfo | null>(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        if (!id) {
          navigate("/");
          return;
        }
        const agentData = await agentService.getAgent(id);
        setAgent({ ...agentData });
      } catch (error) {
        console.error("Failed to fetch agent:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id, navigate]);

  const methods = useForm<AgentInfo>({
    resolver: yupResolver(agentSchema) as unknown as Resolver<AgentInfo>,
    defaultValues: agent || {},
    values: agent || undefined,
  });

  const onSubmit = async (data: AgentInfo) => {
    try {
      setIsSubmitting(true);
      const { id, ...rest } = data;
      // remove all undefined values and empty strings
      const filteredData = Object.fromEntries(
        Object.entries(rest).filter(([_, value]) => value !== undefined && value !== "")
      );
      await agentService.updateAgent(id!, {
        aiAgentDto: {
          ...filteredData, category: [filteredData.topics as string],
        },
      });
      // Navigate to success page or agent list
      navigate("/app");
      toaster.create({
        title: "Agent updated successfully",
      })
    } catch (error) {
      console.error("Failed to create agent:", error);
      // Handle error (show toast, etc)
      toaster.create({
        title: "Failed to update agent",
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
    setCurrentStep((prev) => Math.max(prev - 1, 2));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 2:
        return (
          <AgentInfoForm onNext={nextStep} onBack={prevStep} isEdit={true} />
        );
      case 3:
        return (
          <AgentSocialForm
            onSubmit={methods.handleSubmit(onSubmit)}
            onBack={prevStep}
            isSubmitting={isSubmitting}
            isEdit={true}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentStep]);

  if (loading) {
    return; // You might want to replace this with a proper loading component
  }

  if (!agent) {
    return null;
  }

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="rounded-lg p-6">
        <FormProvider {...methods}>{renderStep()}</FormProvider>
      </div>
    </div>
  );
};

export default EditAgent;
