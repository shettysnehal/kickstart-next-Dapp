import React, { useState, useEffect } from "react";
import factory from "../etherum/factory";
import { CardGroup, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

const CampaignIndex = ({ campaigns }) => {
  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <CardGroup items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open campaigns</h3>
        <Link route="/campaigns/new">
          <a>
            <Button
              content="Create Campaign"
              icon="add circle"
              floated="right"
              primary
            />
          </a>
        </Link>

        {renderCampaigns()}
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {
    props: {
      campaigns,
    },
  };
}

export default CampaignIndex;
