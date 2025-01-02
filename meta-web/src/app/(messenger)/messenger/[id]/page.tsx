import Messanger from '../Messenger';

const page = ({ params }: { params: { id: string } }) => {
    console.log('params', params?.id);

    return (
        <Messanger />
    )
}

export default page