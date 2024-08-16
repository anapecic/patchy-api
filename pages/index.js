import { useState } from "react";
import Image from "next/image";
// import useSWR from "swr";
import styled from "styled-components";
import getAllImages from "@/lib/data";

const StyledImage = styled(Image)``;

const StyledHeading = styled.h1`
  margin-top: 2rem;
  text-decoration: underline dotted;
  text-decoration-thickness: 5px;
  text-decoration-color: #8b5e3c;
`;

const StyledButton = styled.button`
  border: 2px solid #8b5e3c;
  background: #f2e6d9;
  padding: 5px;
  border-radius: 5px;
  font-weight: bold;
  color: #8b5e3c;
  margin-top: 1rem;

  &:hover {
    background: #8b5e3c;
    color: #f2e6d9;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
`;

const StyledDomain = styled.div`
  background-color: lightgrey;
  padding: 1rem;
  font-style: italic;
  display: flex;
  justify-content: center;
  position: relative;
`;

const patchys = getAllImages();
// const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  // const { data: images, error, isLoading } = useSWR("/api/patchy", fetcher);
  const [randomIndex, setRandomIndex] = useState(0);

  // if (error) return <p>error</p>;
  // if (isLoading) return <p>loading ...</p>;
  // if (!images || images.length === 0) return <p>No images available</p>;

  const handleRerender = () => {
    const newRandomIndex = Math.floor(Math.random() * patchys.length);
    setRandomIndex(newRandomIndex);
  };

  return (
    <StyledWrapper>
      <StyledHeading>random patchy</StyledHeading>
      <StyledCard>
        <StyledImage
          src={`/${patchys[randomIndex]}`}
          alt="picture of cute dog"
          width={300}
          height={300}
          style={{ objectFit: "cover" }}
        />
        <StyledButton onClick={handleRerender}>random patchy</StyledButton>
      </StyledCard>
      <p>Check out the api:</p>

      <StyledDomain>
        domain.com/api/patchy{"  "}
        <CopyButton />
      </StyledDomain>
    </StyledWrapper>
  );
}

const StyledSpan = styled.span``;
const StyledActive = styled.div`
  position: absolute;
  background: white;
  border: 1px solid grey;
  padding: 2px;
  border-radius: 5px;
  font-size: 12px;
  right: -35px;
  top: 18px;
`;

function CopyButton() {
  const [active, setActive] = useState(false);

  async function copyToClip(value) {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error(error.message);
    }
  }

  function handleCopying() {
    copyToClip("domain.com/api/patchy");
    setActive(!active);
    setTimeout(() => {
      setActive(active);
    }, 1000);
  }
  return (
    <StyledSpan onClick={handleCopying}>
      <Image
        src="/copy-svgrepo-com.svg"
        width={20}
        height={20}
        alt="copy button"
      />
      {active ? <StyledActive>copied!</StyledActive> : null}
    </StyledSpan>
  );
}
