import { useRef, useState } from "react";
import Button from "@/components/base/Button";
import { CustomTextArea } from "@/features/chat/components/TextAreaCustom";
import { useSendMessageDirect } from "@/features/chat/hooks/useSendMessageDirect";

type Props = {
	conversationId: string;
};

export const ConversationFooter = ({ conversationId }: Props) => {
	const [message, setMessage] = useState("");
	const isSendingRef = useRef(false);
	const { mutate: sendMessageDirect, isPending } = useSendMessageDirect();

	const handleSendMessage = () => {
		const content = message.trim();

		if (!content || isPending || isSendingRef.current) {
			return;
		}

		isSendingRef.current = true;
		sendMessageDirect(
			{
				conversationId: conversationId,
				content,
				attachments: [],
			},
			{
				onSettled: () => {
					isSendingRef.current = false;
				},
			},
		);
		setMessage(""); // Clear the input after sending
	};

	// Old flow:
	// Enter -> onKeyDown -> handleSendMessage()
	// Submit -> onSubmit -> handleSendMessage()
	//
	// New flow:
	// Enter -> onKeyDown -> requestSubmit() -> onSubmit -> handleSendMessage()
	// Click Send -> onSubmit -> handleSendMessage()
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.nativeEvent.isComposing) {
			return;
		}

		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			// Ignore the browser's repeated keydown events while Enter is held.
			if (e.repeat) {
				return;
			}

			e.currentTarget.form?.requestSubmit();
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSendMessage();
	};

	return (
		<form
			className="absolute right-0 bottom-0 left-0 flex items-end gap-2 px-4 py-2"
			onSubmit={handleSubmit}
		>
			<div className="min-w-0 flex-1">
				<CustomTextArea
					className="bg-white"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
			</div>
			<div className="flex shrink-0 gap-2">
				<Button type="submit" disabled={isPending}>
					Send
				</Button>
			</div>
		</form>
	);
};
