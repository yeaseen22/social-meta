import { AppBarComponent } from '@/components/common';

const HomeLayout = (props: { children: React.ReactNode }) => {
    return (
        <AppBarComponent>
            {props.children}
        </AppBarComponent>
    );
};

export default HomeLayout;