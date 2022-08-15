// our-domain.com/new-meetup

import React, { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    // INTERNAL API request to ./api/new-meetup file. Next.js triggers the handler function in that file
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    //Navigate programmatically to firt page
    router.replace("/");
  };
  return (
    <Fragment>
      <Head>
        <title>Meetup | New Meetup</title>
        <meta name="descriptiojn" content="add an new meetup to Meetup app " />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
