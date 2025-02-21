import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Section,
  Text,
  Container,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Container className="bg-white max-w-xl mx-auto p-8 rounded-lg shadow-lg">
        <Section className="text-center">
          
          <Heading 
            as="h1" 
            className="text-2xl font-bold text-gray-800 mb-4"
          >
            Verify Your Account, {username}
          </Heading>
          
          <Section className="bg-blue-50 p-6 rounded-md mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Your Verification Code is:
            </Text>
            <Text 
              className="text-3xl font-bold text-blue-600 tracking-wider bg-white p-4 rounded-md inline-block"
            >
              {otp}
            </Text>
          </Section>
          
          <Section className="mb-6">
            <Text className="text-gray-600 mb-4">
              To complete your registration, please enter this code on our verification page.
            </Text>
            <Text className="text-sm text-gray-500 italic">
              This code will expire in 15 minutes.
            </Text>
          </Section>
          
          <Section className="border-t pt-4 mt-6">
            <Text className="text-sm text-gray-500">
              If you did not request this verification, please ignore this email or 
              contact our support team.
            </Text>
          </Section>
          
          <Section className="mt-6">
            <Text className="text-xs text-gray-400">
              © 2025 Durgesh. All rights reserved.
            </Text>
          </Section>
        </Section>
      </Container>
    </Html>
  );
}