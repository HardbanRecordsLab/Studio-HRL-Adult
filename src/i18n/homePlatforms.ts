import type { Messages } from './index';

export interface PlatformCardData {
  name: string;
  tag: string;
  short: string;
  details: string[];
}

interface PlatformGroups {
  liveCam: PlatformCardData[];
  subscription: PlatformCardData[];
  tube: PlatformCardData[];
  marketing: PlatformCardData[];
}

const en: PlatformGroups = {
  liveCam: [
    { name: 'Chaturbate', tag: '#1 WORLDWIDE', short: 'The largest live audience base.', details: ['Tip Menu, Private, Ticket Show', 'Interactive toys (Lovense)', 'Fanclub $5.99/mo.', '~50% commission', '6M+ viewers daily'] },
    { name: 'MyFreeCams', tag: '#2 WORLDWIDE', short: 'Loyal premium fans.', details: ['MFC Coins + tokens', 'Club Members $29.99/mo.', 'Ranking bonuses', '~50% commission', 'Polish couple = niche'] },
    { name: 'LiveJasmin', tag: 'PREMIUM', short: 'Highest $/min in private.', details: ['Private show is the core model', 'VIP Show 5-15 credits/min', 'Quality-based selection', '~30-35% commission', 'Premium audience'] },
    { name: 'StripChat', tag: 'VR + FAN CLUB', short: 'Fan Club = recurring revenue.', details: ['Fan Club subscription', 'VR shows 180°', 'Interactive toys', '~50% commission', 'OF hybrid in live'] },
    { name: 'CamSoda', tag: 'INNOVATION', short: 'VR and crypto — the niche of the future.', details: ['Premium VR shows', 'Crypto tips (BTC/ETH)', 'VOD sales', '~50% commission', 'Mobile-first'] },
    { name: 'BongaCams', tag: 'EUROPE #1', short: 'Strongest traffic from PL/DE.', details: ['Public Gold Shows', 'Free fanclub', 'Bilingual = an asset', '~50% commission', 'PL/DE/CZ/RU market'] },
    { name: 'Flirt4Free', tag: 'FETISH', short: 'A specialist fetish niche.', details: ['Party Chat, Multi-User', 'Auction-style Feature Shows', 'Affiliate program', '~35-40% commission', 'For experienced creators'] },
    { name: 'ImLive', tag: 'STABLE', short: 'Loyal, older audience.', details: ['Multi-Viewer Show', 'Candy Show', 'Loyalty program', '~35% commission', 'Less competition'] },
  ],
  subscription: [
    { name: 'OnlyFans', tag: '#1 SUB', short: 'The industry standard — a must.', details: ['Sub + PPV + DM + Tips', '20% platform commission', 'Custom content, Live', '100% external traffic', 'Largest sub base'] },
    { name: 'Fansly', tag: 'TOP 3', short: 'The algorithm brings organic traffic.', details: ['Sub + PPV + DM', '20% commission', 'Discover algorithm', 'Subscription tiers', 'Organic traffic'] },
    { name: 'ManyVids', tag: 'VOD+SUB', short: 'Record once, earn for months.', details: ['VOD store + MV Crush sub', '20-40% commission', 'Clip-buyer base', 'MV Live streaming', 'Passive income'] },
    { name: 'Clips4Sale', tag: 'NICHE', short: 'Loyal fans in a specific fetish.', details: ['VOD sales', '35% commission', 'Gigantic niche base', 'Studio system', 'Loyal buyers'] },
    { name: 'AVN Stars', tag: 'BRAND', short: 'AVN industry prestige.', details: ['Sub + VOD + live', '20-25% commission', 'AVN integration', 'Industry awards', 'For brand-name creators'] },
    { name: 'Fanvue', tag: 'FUTURE', short: 'Lowest commission: 15%.', details: ['Sub + PPV + DM', '15% commission (!)', 'AI content tools', 'Good SEO', 'A growing alternative'] },
  ],
  tube: [
    { name: 'Pornhub', tag: 'FUNNEL KING', short: 'Free video = traffic to OF.', details: ['ModelHub: clip sales', 'Fanclub $9.99/mo.', '65% rev share', 'Huge organic traffic', 'Funnel strategy'] },
    { name: 'xHamster', tag: 'SEO POWER', short: 'Strong organic SEO traffic.', details: ['Creator Program', '~60% rev share', 'xHamster Live is separate', 'Good SEO', 'Funnel to OF/Fansly'] },
    { name: 'xVideos', tag: 'PASSIVE', short: 'Earn from premium members.', details: ['XVIDEOS RED sub', '~50% rev share', 'Passive income', 'Zero interaction', 'Simple program'] },
    { name: 'xHamster Live', tag: 'OPTIONAL', short: 'Bonus traffic from xHamster.', details: ['Tokens / live', '~50% commission', 'xH user base', 'Smaller than CB', 'Optional add-on'] },
  ],
  marketing: [
    { name: 'Twitter/X', tag: 'TRAFFIC ARTERY', short: 'Without Twitter you are invisible.', details: ['Adult content allowed', 'Link in bio, previews', 'Spaces, polls', '#OnlyFans hashtags', '#1 traffic channel'] },
    { name: 'Reddit', tag: 'BEST CTR', short: 'Post → click OF → sub. Top conversion.', details: ['Hundreds of NSFW subreddits', 'Upvotes = reach', 'Free traffic', 'r/gonewildcouples', 'Highest CTR'] },
    { name: 'Telegram', tag: 'VIP ECOSYSTEM', short: 'The most loyal fans + PPV outside OF.', details: ['Premium VIP channel', 'Paid TON access', 'PPV via bots', 'Private messages', 'Ecosystem of loyal fans'] },
    { name: 'TikTok', tag: 'BRAND AWARENESS', short: 'Builds a personality, fans come to you.', details: ['SFW lifestyle only', 'Linktree link in bio', 'Billions of reach', 'Strict rules', 'Brand awareness'] },
    { name: 'Instagram', tag: 'LIFESTYLE', short: 'A "normal" couple on IG → curiosity about OF.', details: ['SFW Stories, Reels', 'Link in bio via Linktree', 'Brand building', 'Zero explicit', 'Lifestyle content'] },
  ],
};

const pl: PlatformGroups = {
  liveCam: [
    { name: 'Chaturbate', tag: '#1 ŚWIAT', short: 'Największa baza widzów live.', details: ['Tip Menu, Private, Ticket Show', 'Interactive toys (Lovense)', 'Fanclub $5.99/mies.', '~50% prowizji', '6M+ widzów dziennie'] },
    { name: 'MyFreeCams', tag: '#2 ŚWIAT', short: 'Lojalni fani premium.', details: ['MFC Coins + tokeny', 'Club Members $29.99/mies.', 'Bonusy za ranking', '~50% prowizji', 'Polska para = nisza'] },
    { name: 'LiveJasmin', tag: 'PREMIUM', short: 'Najwyższy $/min w private.', details: ['Private show główny model', 'VIP Show 5-15 credits/min', 'Selekcja jakościowa', '~30-35% prowizji', 'Premium audience'] },
    { name: 'StripChat', tag: 'VR + FAN CLUB', short: 'Fan Club = stały przychód.', details: ['Fan Club subskrypcja', 'VR shows 180°', 'Interactive toys', '~50% prowizji', 'Hybryda OF w live'] },
    { name: 'CamSoda', tag: 'INNOWACJE', short: 'VR i krypto — nisza przyszłości.', details: ['VR shows premium', 'Krypto tip (BTC/ETH)', 'VOD sprzedaż', '~50% prowizji', 'Mobile-first'] },
    { name: 'BongaCams', tag: 'EUROPA #1', short: 'Najsilniejszy ruch z PL/DE.', details: ['Gold Shows publiczne', 'Darmowy fanclub', 'Dwujęzyczność = atut', '~50% prowizji', 'PL/DE/CZ/RU rynek'] },
    { name: 'Flirt4Free', tag: 'FETYSZ', short: 'Specjalistyczna nisza fetysz.', details: ['Party Chat, Multi-User', 'Feature Shows aukcyjne', 'Program partnerski', '~35-40% prowizji', 'Dla doświadczonych'] },
    { name: 'ImLive', tag: 'STABILNY', short: 'Lojalny, starszy audience.', details: ['Multi-Viewer Show', 'Candy Show', 'Program lojalnościowy', '~35% prowizji', 'Mniejsza konkurencja'] },
  ],
  subscription: [
    { name: 'OnlyFans', tag: '#1 SUB', short: 'Standard branży — obowiązkowa.', details: ['Sub + PPV + DM + Tips', '20% prowizji platformy', 'Custom content, Live', 'Ruch 100% zewnętrzny', 'Największa baza sub'] },
    { name: 'Fansly', tag: 'TOP 3', short: 'Algorytm daje ruch organiczny.', details: ['Sub + PPV + DM', '20% prowizji', 'Algorytm discover', 'Tier subskrypcji', 'Organiczny ruch'] },
    { name: 'ManyVids', tag: 'VOD+SUB', short: 'Nagraj raz, zarabiaj miesiącami.', details: ['VOD sklep + MV Crush sub', '20-40% prowizji', 'Baza kupujących klipy', 'MV Live streaming', 'Pasywny dochód'] },
    { name: 'Clips4Sale', tag: 'NISZA', short: 'Lojalni fani w konkretnym fetyszu.', details: ['VOD sprzedaż', '35% prowizji', 'Gigantyczna baza nisz', 'Studio system', 'Lojalni kupujący'] },
    { name: 'AVN Stars', tag: 'MARKA', short: 'Prestiż branżowy AVN.', details: ['Sub + VOD + live', '20-25% prowizji', 'Integracja z AVN', 'Branżowe nagrody', 'Dla markowych twórców'] },
    { name: 'Fanvue', tag: 'PRZYSZŁOŚĆ', short: 'Najniższa prowizja 15%.', details: ['Sub + PPV + DM', '15% prowizji (!)', 'AI content tools', 'Dobre SEO', 'Rosnąca alternatywa'] },
  ],
  tube: [
    { name: 'Pornhub', tag: 'FUNNEL KING', short: 'Darmowe video = ruch do OF.', details: ['ModelHub: sprzedaż klipów', 'Fanclub $9.99/mies.', 'Rev share 65%', 'Ogromny ruch organiczny', 'Strategia lejka'] },
    { name: 'xHamster', tag: 'SEO POWER', short: 'Silny organiczny ruch SEO.', details: ['Creator Program', 'Rev share ~60%', 'xHamster Live osobno', 'Dobre SEO', 'Funnel do OF/Fansly'] },
    { name: 'xVideos', tag: 'PASYWNY', short: 'Zarabiaj od premium członków.', details: ['XVIDEOS RED sub', 'Rev share ~50%', 'Pasywny dochód', 'Zero interakcji', 'Prosty program'] },
    { name: 'xHamster Live', tag: 'OPCJONALNE', short: 'Bonus ruch z xHamster.', details: ['Tokeny / live', '~50% prowizji', 'Baza użytkowników xH', 'Mniejszy niż CB', 'Opcjonalne uzupełnienie'] },
  ],
  marketing: [
    { name: 'Twitter/X', tag: 'ARTERIA RUCHU', short: 'Bez Twittera jesteś niewidzialny.', details: ['Adult content dozwolony', 'Link w bio, preview', 'Spaces, polls', 'Hashtagi #OnlyFans', '#1 kanał ruchu'] },
    { name: 'Reddit', tag: 'NAJLEPSZE CTR', short: 'Post → klik OF → sub. Top konwersja.', details: ['Setki NSFW subredditów', 'Upvoty = zasięg', 'Bezpłatny ruch', 'r/gonewildcouples', 'Najwyższe CTR'] },
    { name: 'Telegram', tag: 'VIP ECOSYSTEM', short: 'Najlojalniejsi fani + PPV poza OF.', details: ['Kanał VIP premium', 'Płatny dostęp TON', 'PPV via boty', 'Wiadomości prywatne', 'Ekosystem lojalnych'] },
    { name: 'TikTok', tag: 'BRAND AWARENESS', short: 'Buduje osobowość, fani przychodzą.', details: ['Tylko SFW lifestyle', 'Link Linktree w bio', 'Miliardy zasięgów', 'Ścisłe zasady', 'Świadomość marki'] },
    { name: 'Instagram', tag: 'LIFESTYLE', short: 'Para "normalna" na IG → ciekawość OF.', details: ['Stories, Reels SFW', 'Link w bio Linktree', 'Brand building', 'Zero explicit', 'Lifestyle content'] },
  ],
};

export const homePlatforms: Messages<PlatformGroups> = { en, pl };
