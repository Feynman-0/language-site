import dns from 'node:dns';

dns.resolve('pfzhdyirsrdcpvtqzkza.supabase.co', (err, addresses) => {
  if (err) {
    console.error('DNS_ERROR:', err);
  } else {
    console.log('DNS_SUCCESS:', addresses);
  }
});
