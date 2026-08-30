import { useState, useEffect } from 'react';
import {
  AppShell,
  Burger,
  Group,
  Title,
  Button,
  Container,
  Box,
  Text,
  Paper,
  Badge,
  Stack,
  SimpleGrid,
  Image,
  Divider,
  Select,
  Drawer,
  Anchor,
  ActionIcon,
  Center,
} from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import heroImg from './assets/images/hero.webp';
import characterImg from './assets/images/character.webp';

const NAV_KEYS = ['main', 'story', 'characters', 'order', 'download'];

function App() {
  const { t, i18n } = useTranslation();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const pinned = useHeadroom({ fixedAt: 80 });
  const [active, setActive] = useState('main');

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(id);
      closeDrawer();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    NAV_KEYS.forEach((k) => {
      const el = document.getElementById(k);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navItems = NAV_KEYS.map((key) => (
    <Anchor
      key={key}
      underline="never"
      onClick={() => scrollTo(key)}
      c={active === key ? 'violet.3' : 'dimmed'}
      fw={active === key ? 700 : 500}
      fz="sm"
      style={{
        cursor: 'pointer',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        borderBottom: active === key ? '2px solid var(--mantine-color-violet-4)' : '2px solid transparent',
        paddingBottom: 4,
        transition: 'all 0.2s',
      }}
    >
      {t(`nav.${key}`)}
    </Anchor>
  ));

  const langOptions = [
    { value: 'en', label: t('lang.en') },
    { value: 'zh-CN', label: t('lang.zh-CN') },
    { value: 'zh-TW', label: t('lang.zh-TW') },
    { value: 'ja', label: t('lang.ja') },
  ];

  return (
    <AppShell
      header={{ height: 64, collapsed: !pinned, offset: false }}
      padding={0}
    >
      <AppShell.Header
        withBorder={false}
        style={{
          background: 'rgba(12, 10, 22, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          transform: `translateY(${pinned ? 0 : '-100%'})`,
          transition: 'transform 0.25s ease',
        }}
      >
        <Container size="xl" h="100%">
          <Group h="100%" justify="space-between" wrap="nowrap">
            <Group gap="md" wrap="nowrap">
              <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" size="sm" color="white" />
              <Title
                order={1}
                fz={{ base: 18, sm: 20 }}
                fw={900}
                lts="0.12em"
                style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
                onClick={() => scrollTo('main')}
              >
                <Text span inherit c="violet.3">
                  STORY
                </Text>{' '}
                <Text span inherit c="white">
                  NOW
                </Text>
              </Title>
              <Box visibleFrom="sm" ml="lg">
                <Group gap="xl">{navItems}</Group>
              </Box>
            </Group>

            <Group gap="sm" wrap="nowrap">
              <Select
                value={i18n.language}
                onChange={(v) => v && i18n.changeLanguage(v)}
                data={langOptions}
                size="xs"
                variant="filled"
                w={128}
                allowDeselect={false}
                styles={{
                  input: {
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'white',
                    fontWeight: 500,
                  },
                  dropdown: { background: '#1a1625', borderColor: 'rgba(255,255,255,0.12)' },
                  option: { color: 'white' },
                }}
              />
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="280px"
        hiddenFrom="sm"
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        styles={{
          content: { background: '#0f0d1a' },
          body: { padding: 0 },
        }}
      >
        <Stack gap={0} p="md">
          <Group justify="space-between" mb="lg">
            <Text fw={800} lts="0.1em" c="violet.3">
              MENU
            </Text>
            <ActionIcon variant="subtle" color="gray" onClick={closeDrawer} aria-label="Close">
              ✕
            </ActionIcon>
          </Group>
          <Divider color="rgba(255,255,255,0.06)" mb="md" />
          {NAV_KEYS.map((k) => (
            <Box
              key={k}
              onClick={() => scrollTo(k)}
              style={{
                cursor: 'pointer',
                padding: '16px 12px',
                borderLeft: active === k ? '3px solid var(--mantine-color-violet-5)' : '3px solid transparent',
                background: active === k ? 'rgba(124, 58, 237, 0.12)' : 'transparent',
                borderRadius: 6,
              }}
            >
              <Text fw={active === k ? 700 : 500} c={active === k ? 'violet.2' : 'gray.3'} tt="uppercase" fz="sm" lts="0.08em">
                {t(`nav.${k}`)}
              </Text>
            </Box>
          ))}
          <Divider color="rgba(255,255,255,0.06)" my="md" />
          <Select
            label={<Text fz="xs" c="dimmed" tt="uppercase" lts="0.08em">Language</Text>}
            value={i18n.language}
            onChange={(v) => v && i18n.changeLanguage(v)}
            data={langOptions}
            allowDeselect={false}
            styles={{
              input: { background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)', color: 'white' },
              dropdown: { background: '#1a1625' },
            }}
          />
        </Stack>
      </Drawer>

      <AppShell.Main>
        {/* HERO / MAIN */}
        <Box
          id="main"
          component="section"
          style={{
            minHeight: '100vh',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: '#0a0812',
          }}
        >
          <Box
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${heroImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
              filter: 'brightness(0.55) saturate(1.1)',
            }}
          />
          <Box
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(10,8,18,0.35) 0%, rgba(10,8,18,0.15) 35%, rgba(10,8,18,0.85) 88%, #0a0812 100%), linear-gradient(90deg, rgba(10,8,18,0.75) 0%, rgba(10,8,18,0.2) 55%, transparent 85%)',
            }}
          />
          <Container size="xl" style={{ position: 'relative', zIndex: 1, width: '100%' }} py={{ base: 80, md: 120 }}>
            <Stack gap="xl" maw={640}>
              <Badge
                size="lg"
                variant="light"
                color="violet"
                radius="xl"
                style={{ alignSelf: 'flex-start', textTransform: 'none', letterSpacing: '0.06em' }}
              >
                ✦ Visual Novel • 2026
              </Badge>
              <Box>
                <Title
                  order={1}
                  fz={{ base: 48, sm: 64, md: 72 }}
                  fw={900}
                  lh={0.95}
                  lts="-0.02em"
                  c="white"
                  style={{ textShadow: '0 4px 32px rgba(0,0,0,0.6)' }}
                >
                  {t('hero.title').split(' ').map((w, i) => (
                    <Text key={i} span inherit c={i === 0 ? 'violet.3' : 'white'}>
                      {w}{' '}
                    </Text>
                  ))}
                </Title>
                <Text fz={{ base: 18, sm: 22 }} c="violet.1" fw={300} lts="0.14em" tt="uppercase" mt="sm">
                  {t('hero.subtitle')}
                </Text>
              </Box>
              <Text fz={{ base: 'md', sm: 'lg' }} c="gray.2" lh={1.7} maw={520} style={{ textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>
                {t('hero.description')}
              </Text>
              <Group gap="md" mt="sm">
                <Button
                  size="lg"
                  radius="xl"
                  color="violet"
                  onClick={() => scrollTo('story')}
                  style={{ paddingLeft: 28, paddingRight: 28, fontWeight: 700, letterSpacing: '0.06em' }}
                >
                  {t('hero.cta')} →
                </Button>
                <Button
                  size="lg"
                  radius="xl"
                  variant="white"
                  c="dark"
                  onClick={() => scrollTo('order')}
                  style={{ fontWeight: 600 }}
                >
                  {t('nav.order')}
                </Button>
              </Group>
              <Text fz="xs" c="gray.5" lts="0.18em" tt="uppercase" mt="xl" style={{ opacity: 0.7 }}>
                ↓ {t('hero.scroll')}
              </Text>
            </Stack>
          </Container>
        </Box>

        {/* STORY */}
        <Box id="story" component="section" bg="#0f0d1a" py={{ base: 64, md: 96 }}>
          <Container size="xl">
            <Stack gap={8} mb={48} align="center">
              <Text fz="xs" lts="0.2em" tt="uppercase" c="violet.3" fw={700}>
                {t('story.title')}
              </Text>
              <Title order={2} fz={{ base: 32, md: 42 }} fw={800} c="white" ta="center">
                {t('story.heading')}
              </Title>
              <Box w={48} h={3} bg="violet.5" style={{ borderRadius: 2 }} mt="xs" />
            </Stack>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 32, md: 48 }} verticalSpacing={32}>
              <Stack gap="lg" justify="center">
                <Text c="gray.3" lh={1.8} fz="md">
                  {t('story.p1')}
                </Text>
                <Text c="gray.3" lh={1.8} fz="md">
                  {t('story.p2')}
                </Text>
                <Paper
                  withBorder
                  p="md"
                  radius="md"
                  style={{
                    background: 'rgba(124, 58, 237, 0.08)',
                    borderColor: 'rgba(124, 58, 237, 0.25)',
                    borderLeft: '3px solid var(--mantine-color-violet-5)',
                  }}
                >
                  <Text c="violet.1" fw={600} fs="italic">
                    {t('story.p3')}
                  </Text>
                </Paper>
              </Stack>

              <Stack gap="sm">
                <Box
                  style={{
                    position: 'relative',
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: '#000',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    aspectRatio: '16 / 9',
                  }}
                >
                  <Box
                    component="iframe"
                    src="https://www.youtube.com/embed/jNQXAC9IVRw?rel=0&modestbranding=1"
                    title="Story Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                  />
                </Box>
                <Text fz="xs" c="dimmed" ta="center" lts="0.08em">
                  ▶ {t('story.videoCaption')} — YouTube • jNQXAC9IVRw (Me at the zoo — first public video)
                </Text>
              </Stack>
            </SimpleGrid>
          </Container>
        </Box>

        {/* CHARACTERS — required: div with 2 div inside in a row, left image, right text */}
        <Box id="characters" component="section" bg="#0a0812" py={{ base: 64, md: 96 }}>
          <Container size="xl">
            <Stack gap={8} mb={48} align="center">
              <Text fz="xs" lts="0.2em" tt="uppercase" c="violet.3" fw={700}>
                {t('characters.title')}
              </Text>
              <Title order={2} fz={{ base: 32, md: 42 }} fw={800} c="white" ta="center">
                {t('characters.name')}
              </Title>
              <Text c="violet.2" fz="sm" lts="0.12em" tt="uppercase">
                {t('characters.role')}
              </Text>
              <Box w={48} h={3} bg="violet.5" style={{ borderRadius: 2 }} mt="xs" />
            </Stack>

            {/* Strict requirement: a div with 2 div inside in a row */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '32px',
                alignItems: 'stretch',
                flexWrap: 'wrap',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              {/* LEFT */}
              <div
                style={{
                  flex: '1 1 380px',
                  minWidth: 280,
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 460,
                  background: '#1a1625',
                }}
              >
                <Image
                  src={characterImg}
                  alt="Character"
                  h="100%"
                  style={{ objectFit: 'cover', objectPosition: 'center top', height: '100%', minHeight: 460 }}
                />
                <Box
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px 20px 16px',
                    background: 'linear-gradient(transparent, rgba(10,8,18,0.85))',
                  }}
                >
                  <Text c="white" fw={700} fz="lg">
                    {t('characters.name')}
                  </Text>
                  <Text c="violet.2" fz="xs" lts="0.1em" tt="uppercase">
                    {t('characters.role')}
                  </Text>
                </Box>
              </div>

              {/* RIGHT */}
              <div
                style={{
                  flex: '1 1 380px',
                  minWidth: 280,
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 20,
                }}
              >
                <Group gap="xs">
                  <Badge color="violet" variant="light">
                    {t('characters.tag1')}
                  </Badge>
                  <Badge color="pink" variant="light">
                    {t('characters.tag2')}
                  </Badge>
                  <Badge color="gray" variant="light">
                    {t('characters.tag3')}
                  </Badge>
                </Group>

                <Stack gap="md">
                  <Text c="gray.2" lh={1.8}>
                    {t('characters.desc1')}
                  </Text>
                  <Text c="gray.3" lh={1.8}>
                    {t('characters.desc2')}
                  </Text>
                </Stack>

                <Paper
                  p="md"
                  radius="md"
                  style={{
                    background: 'rgba(124,58,237,0.1)',
                    borderLeft: '3px solid var(--mantine-color-violet-5)',
                  }}
                >
                  <Text c="violet.1" fs="italic" fw={500}>
                    {t('characters.quote')}
                  </Text>
                </Paper>

                <Group gap="sm" mt="sm">
                  <Box w={32} h={2} bg="violet.5" style={{ borderRadius: 1 }} />
                  <Text fz="xs" c="dimmed" lts="0.1em" tt="uppercase">
                    Route — {t('characters.name')}
                  </Text>
                </Group>
              </div>
            </div>
          </Container>
        </Box>

        {/* ORDER */}
        <Box id="order" component="section" bg="#0f0d1a" py={{ base: 64, md: 96 }}>
          <Container size="lg">
            <Stack gap={8} mb={48} align="center">
              <Text fz="xs" lts="0.2em" tt="uppercase" c="violet.3" fw={700}>
                {t('order.title')}
              </Text>
              <Title order={2} fz={{ base: 32, md: 42 }} fw={800} c="white" ta="center">
                {t('order.heading')}
              </Title>
              <Text c="dimmed" ta="center" maw={560}>
                {t('order.description')}
              </Text>
              <Box w={48} h={3} bg="violet.5" style={{ borderRadius: 2 }} mt="xs" />
            </Stack>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
              {[
                { key: 'steam', icon: '◈', color: 'violet' },
                { key: 'site', icon: '✦', color: 'pink' },
                { key: 'amazon', icon: '⬢', color: 'grape' },
                { key: 'retail', icon: '⬣', color: 'indigo' },
              ].map((item) => (
                <Paper
                  key={item.key}
                  p="xl"
                  radius="lg"
                  withBorder
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderColor: 'rgba(255,255,255,0.07)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Badge color={item.color} variant="light" mb="md">
                    {t('order.comingSoon')}
                  </Badge>
                  <Group gap="sm" mb="xs">
                    <Center
                      w={36}
                      h={36}
                      style={{ borderRadius: 10, background: 'rgba(124,58,237,0.15)', color: 'var(--mantine-color-violet-3)', fontWeight: 800 }}
                    >
                      {item.icon}
                    </Center>
                    <Text c="white" fw={600} fz="sm" style={{ flex: 1 }}>
                      {t(`order.platforms.${item.key}`)}
                    </Text>
                  </Group>
                  <Text fz="xs" c="dimmed" mt="sm">
                    Placeholder storefront link — to be announced.
                  </Text>
                  <Button variant="light" color="violet" size="xs" mt="md" disabled>
                    {t('order.comingSoon')}
                  </Button>
                </Paper>
              ))}
            </SimpleGrid>

            <Paper
              mt="xl"
              p="md"
              radius="md"
              withBorder
              style={{ background: 'rgba(251,191,36,0.06)', borderColor: 'rgba(251,191,36,0.2)', textAlign: 'center' }}
            >
              <Text fz="sm" c="yellow.2">
                ℹ {t('order.note')}
              </Text>
            </Paper>
          </Container>
        </Box>

        {/* DOWNLOAD */}
        <Box id="download" component="section" bg="#0a0812" py={{ base: 64, md: 96 }}>
          <Container size="lg">
            <Stack gap={8} mb={48} align="center">
              <Text fz="xs" lts="0.2em" tt="uppercase" c="violet.3" fw={700}>
                {t('download.title')}
              </Text>
              <Title order={2} fz={{ base: 32, md: 42 }} fw={800} c="white" ta="center">
                {t('download.heading')}
              </Title>
              <Text c="dimmed" ta="center" maw={560}>
                {t('download.description')}
              </Text>
              <Box w={48} h={3} bg="violet.5" style={{ borderRadius: 2 }} mt="xs" />
            </Stack>

            <Stack gap="md">
              <Text fz="xs" lts="0.14em" tt="uppercase" c="dimmed" fw={700}>
                {t('download.patches')} — {t('download.none')}
              </Text>

              {[
                {
                  title: t('download.placeholder1Title'),
                  desc: t('download.placeholder1Desc'),
                  status: t('download.placeholder1Status'),
                  version: 'v1.01',
                  size: '1.2 GB',
                  date: '2026-09-01',
                  color: 'violet',
                },
                {
                  title: t('download.placeholder2Title'),
                  desc: t('download.placeholder2Desc'),
                  status: t('download.placeholder2Status'),
                  version: 'v1.10',
                  size: '3.4 GB',
                  date: '2026-10-15',
                  color: 'pink',
                },
                {
                  title: t('download.placeholder3Title'),
                  desc: t('download.placeholder3Desc'),
                  status: t('download.placeholder3Status'),
                  version: '—',
                  size: '860 MB',
                  date: 'TBA',
                  color: 'gray',
                },
              ].map((p, idx) => (
                <Paper
                  key={idx}
                  p="lg"
                  radius="lg"
                  withBorder
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderColor: 'rgba(255,255,255,0.07)',
                    opacity: 0.95,
                  }}
                >
                  <Group justify="space-between" align="flex-start" wrap="nowrap" gap="md">
                    <Stack gap={6} style={{ flex: 1 }}>
                      <Group gap="xs">
                        <Title order={4} c="white" fz="md">
                          {p.title}
                        </Title>
                        <Badge color={p.color} variant="light" size="sm">
                          {p.status}
                        </Badge>
                      </Group>
                      <Text c="dimmed" fz="sm">
                        {p.desc}
                      </Text>
                      <Group gap="lg" mt={4}>
                        <Text fz="xs" c="dimmed">
                          {t('download.version')}: <Text span c="gray.3">{p.version}</Text>
                        </Text>
                        <Text fz="xs" c="dimmed">
                          {t('download.size')}: <Text span c="gray.3">{p.size}</Text>
                        </Text>
                        <Text fz="xs" c="dimmed">
                          {t('download.date')}: <Text span c="gray.3">{p.date}</Text>
                        </Text>
                      </Group>
                    </Stack>
                    <Button size="sm" radius="xl" variant="light" color="violet" disabled>
                      {t('download.unavailable')}
                    </Button>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Container>
        </Box>

        {/* FOOTER */}
        <Box bg="#060510" py="xl" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Container size="xl">
            <Group justify="space-between" wrap="wrap" gap="md">
              <Stack gap={4}>
                <Text fw={800} lts="0.12em" c="white" fz="sm">
                  STORY NOW
                </Text>
                <Text fz="xs" c="dimmed">
                  {t('footer.rights')}
                </Text>
              </Stack>
              <Text fz="xs" c="dimmed" fs="italic">
                {t('footer.disclaimer')}
              </Text>
            </Group>
          </Container>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
