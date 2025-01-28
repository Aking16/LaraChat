import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatLayout from "@/Layouts/ChatLayout";
import { Head } from "@inertiajs/react";

function Home({ auth }) {
  return (
    <div>
      <Head title="Home" />
      Home
    </div>
  );
}

Home.layout = (page) => {
  return (
    <AuthenticatedLayout>
      <ChatLayout>
        {page}
      </ChatLayout>
    </AuthenticatedLayout>
  );
};

export default Home;
