//ouer-domain.com/meetupId
import React, { Fragment } from "react";
import Head from 'next/head';
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{`Meetup | ${props.meetupData.title}`}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  //connectiong to database
  const client = await MongoClient.connect(
    "mongodb+srv://sarah-habibi:HoTcOlD68@cluster0.ckqkq1e.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),

    // [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  // fetching data for a single meetup
  //connectiong to database
  const client = await MongoClient.connect(
    "mongodb+srv://sarah-habibi:HoTcOlD68@cluster0.ckqkq1e.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  // To get meetupId from URL: context.param
  // context.params returns an object with property=meetupId (whatever insid [ ] )value=acual values encoded in the URL

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}

export default MeetupDetails;
