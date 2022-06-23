export interface W3Color {
  toRgb: () => { r: number; b: number; g: number; a: number };
}

declare interface Window {
  w3color: (
    color: Record<string, unknown> | string,
    element?: HTMLElement
  ) => W3Color;
}

type AttachmentType = "image" | "text" | "drawing";

export interface AttachmentBase {
  id: () => number;
  width: number;
  height: number;
  x: number;
  y: number;
  type: AttachmentType | any;
}

export interface JSXElementAttachment extends Exclude<AttachmentBase, "type"> {
  component?: React.ReactNode;
  type: string;
  data: any;
  pageNumber: number;
  // id: string;
}

export interface ImageAttachment extends AttachmentBase {
  file: File;
  img: HTMLImageElement;
}

export interface DrawingAttachment extends AttachmentBase {
  path?: string;
  scale?: number;
  stroke?: string;
  strokeWidth?: number;
}

export interface TextAttachment extends AttachmentBase {
  text?: string;
  fontFamily?: string;
  size?: number;
  lineHeight?: number;
  lines?: string[];
}

export interface Dimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

type Attachment = ImageAttachment | DrawingAttachment | TextAttachment;
type JSXAttachment = JSXElementAttachment;

type Attachments = Attachment[];
type JSXAttachments = JSXAttachment[];

type DragEventListener<T> = (e: React.MouseEvent<T>) => void;
