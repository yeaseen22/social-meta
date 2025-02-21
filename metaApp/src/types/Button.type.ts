export type FollowButtonType = {
    title: string;
    size: number;
    onPress?: () => void;
    children?: any
};

export type ButtonType = {
    title: string;
    bgColor?: string;
    size?: number;
    textColor?: string;
    width?: number;
    height?: number;
    onPress?: (event: any) => void;
    children?: React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
};

export type RootStackParamList = {
    UploadProfile: undefined;
    MainTabs: undefined;
    // Add other routes as needed
};
