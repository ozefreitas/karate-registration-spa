import { useQuery } from "@tanstack/react-query";
import { FeedbackService } from "../../openapi";

export const useFetchFeedbackData = () => {
  return useQuery({
    queryKey: ["feedback"],
    queryFn: FeedbackService.feedbackList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchSingleFeedback = (feedbackId: number) => {
  return useQuery({
    queryKey: ["single-feedback"],
    queryFn: () => FeedbackService.feedbackRetrieve(feedbackId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
