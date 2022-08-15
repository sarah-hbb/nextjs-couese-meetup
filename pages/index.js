// our-domain.com
import React, { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const Hompage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetup | All Meetups</title>
        <meta name='description' content="an application for meetups, created during learning react (nextJS) "/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context){
// const req = context.req;
// const res = context.res;
//   // fetch data from an API
//   return{
//     props: {meetups: DUMMY_MEETUPS},
//     revalidate: 10
//   }
// }

// USE ONLY ONE OF THESE TWO ⬆️⬇️

export async function getStaticProps() {
  // fetch data from an API
  //connectiong to database
  const client = await MongoClient.connect(
    "mongodb+srv://sarah-habibi:HoTcOlD68@cluster0.ckqkq1e.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  //find all the data in meetups collection
  const meetups = await meetupsCollection.find().toArray();
  // this meetup array contains id: some object which should NOT be used as it is.we need to map it to make desired object out of it
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default Hompage;

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "E-commerce meetup",
//     image:
//       "https://spreecommerce.org/wp-content/uploads/2019/09/P1040030-e1567767587142.jpg",
//     address: "Berlin , Brandenbur , 4536",
//     description: "E-commerce meetup for marketers",
//   },
//   {
//     id: "m2",
//     title: "Techno meetup",
//     image:
//       "https://www.innovate.community/resources/uploads/cache/IMU-090620-LORES-BarbaraKerkhof-3369-ov42hshnhppkns4imjxx5bwbrbjnkud8p79rcp6akg.jpg",
//     address: "Berlin , Berghein , Panoramabar",
//     description: "Techno meetup for techno lovers",
//   },
// ];
