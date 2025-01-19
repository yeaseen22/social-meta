import Messanger from '../Messenger';

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    console.log('params', id);

    return (
        <Messanger />
    )
}

export default page