/* Textos en inglés. El español está escrito en el HTML; cada clave reemplaza el contenido de [data-i18n]. */
(function () {
  const KH = (window.KH = window.KH || {});
  KH.I18N = { en: {
    /* comunes */
    skip: 'Skip to content', menu: 'Menu',
    'nav.inicio': 'Home', 'nav.estudio': 'Studio', 'nav.artistas': 'Artists', 'nav.servicios': 'Services', 'nav.sesiones': 'Sessions', 'nav.merch': 'Merch',
    'cta.reservar': 'Book a session', copy: 'Copy', copied: 'Copied', 'map.link': 'See on the map',
    'svc.grabacion': 'Recording', 'svc.mezcla': 'Mixing', 'svc.mastering': 'Mastering', 'svc.produccion': 'Production', 'svc.sala': 'Room rental', 'svc.sala.short': 'Room',
    'foot.loc': 'Chacarita, Buenos Aires',
    'closer2.h': 'Got a track to record?',
    'err.required': 'Fill in this field.', 'err.email': 'Check the email: the @ or the domain is missing (e.g. name@gmail.com).', 'err.services': 'Pick at least one service.', 'err.temas': 'Enter a number between 1 and 30.', 'err.date': 'That date has passed. Pick today or later.',

    /* inicio */
    'hero.k': 'Recording studio · Chacarita, Buenos Aires', 'hero.l1': 'Power', 'hero.l2': 'up.',
    'hero.sub': 'Over six years recording urban music, with Mariano Bilinkis leading every session.', 'hero.ses': 'See sessions',
    'foot.city': 'Chacarita, Buenos Aires', 'c.call': 'Call or WhatsApp', 'c.book': 'Book your session',
    'art.h': 'Through the room', 'art.p': 'Some of the artists and producers who recorded with us.', 'art.all': 'See all credits',
    'temas.h': 'Made at Kame House', 'temas.p': 'Tracks that went through the studio.',
    'field.h': 'The house',
    'field.p1': 'Kame House has been recording urban music in Chacarita for more than six years. The name comes from Dragon Ball: it is Master Roshi’s house, where Goku and Krillin train as kids. The idea here is similar: a calm place to work on a track until it is ready.',
    'field.p2': 'Sessions are led by Mariano Bilinkis, who took part in Grammy-nominated and Grammy-winning projects. High-fidelity analog gear and digital tools share the room, and recording, mixing and mastering all happen in the same place.',
    'field.p3': 'The studio also runs its own record label. Bhavi, Khea, Asan, Neo Pistea, YSY A and Feid have all recorded here, among others.',
    'field.go': 'About the studio',
    'chain.h': 'How we work', 'chain.p': 'From the first take to the final file, all in the same room.',
    'ch.1': 'Recording', 'ch.2': 'Editing', 'ch.3': 'Mixing', 'ch.4': 'Mastering', 'ch.5': 'Delivery',
    'ch.1.p': 'Vocals and instruments in the room, with analog and digital gear.', 'ch.2.p': 'We pick the best takes and fix timing and tuning.', 'ch.3.p': 'We balance the tracks: levels, space and the character of the song.', 'ch.4.p': 'We get the track ready to sound even on every platform.', 'ch.5.p': 'You leave with the final files, ready to release.',
    'chain.also': 'You can also book a single stage, add production or rent the room:', 'chain.only': 'Mixing or mastering only', 'chain.quote': 'Ask for a quote',
    'svc.h': 'Services', 'svc.price': 'We quote every project separately. Tell us what you have and we send you a price.', 'svc.go': 'Ask',
    'svc.grabacion.p': 'Vocals and instruments in the room, with the studio’s gear.', 'svc.mezcla.p': 'Your tracks sorted and balanced to what the song needs.', 'svc.mastering.p': 'The final pass, so the track sounds even on every platform.', 'svc.produccion.p': 'If you come with an idea and no beat, we build it with you.', 'svc.sala.p': 'The room by the hour, for you and your crew.',
    'b.h': 'Build your session', 'b.svc': 'What do you need?', 'b.temas': 'How many tracks?', 'b.beat': 'And the beat?', 'b.beat.a': 'I bring my own', 'b.beat.b': 'I need production', 'b.res': 'Your session', 'b.go': 'Continue to booking',
    'ses.h': 'Sessions', 'ses.p': 'Session footage and production tips. We post them on our Instagram.', 'more.ig': 'More sessions on Instagram',
    'mk.h': 'Make your cover', 'mk.note': 'Try the template the studio uses for every session: add your AKA and your track name.', 'mk.aka': 'Your AKA', 'mk.tema': 'Your track', 'mk.color': 'Plate', 'mk.negro': 'Black', 'mk.violeta': 'Violet', 'mk.go': 'Book to record it',
    'merch.h': 'Official merch', 'merch.p': 'Hoodies, caps, polos and lanyards with the studio’s brand.', 'm.1': 'Hoodie', 'm.2': 'Cap', 'm.3': 'Polo',
    'closer.h': 'Come to the house.',
    /* reservar */
    'book.h1': 'Book your session', 'book.lead': 'Tell us what you want to do and we’ll reply with a date and a quote. The request goes out by WhatsApp or email, whichever you prefer.',
    'st.1.l': 'What you’re here for', 'st.2.l': 'When', 'st.3.l': 'Who you are',
    'f.svc': 'Services', 'f.svc.h': 'You can pick more than one.', 'f.temas': 'Number of tracks', 'f.ref': 'References', 'f.ref.h': 'Links to your demos or to tracks whose sound you like. Optional.',
    'f.fecha': 'Preferred date', 'f.flex': 'My dates are flexible', 'f.presu': 'Budget', 'f.presu.a': 'Send me a quote', 'f.presu.b': 'I have an amount in mind', 'f.monto': 'How much do you have in mind?',
    'f.aka': 'Artist name or AKA', 'f.mail': 'Email', 'f.msg': 'Anything else you want to tell us', opt: '(optional)',
    'sum.h': 'Your request', 'sum.temas': 'Tracks', 'sum.fecha': 'Date', 'sum.nombre': 'Name', 'sum.tbd': 'To be agreed', 'sum.flex': 'flexible', 'sum.monto': 'I have in mind',
    'send.wa': 'Send by WhatsApp', 'send.mail': 'Send by email', 'send.note': 'WhatsApp or your email opens with the request already written. You check it and send it.',
    'send.ok.wa': 'Done: WhatsApp opened with your request. If it didn’t, write to +54 9 11 1234-5678.', 'send.ok.mail': 'Done: your email opened with the request. If it didn’t, write to EstudioKameHouse@gmail.com.',
    'msg.hi': 'Hi, Kame House. I’d like to book a session.', 'msg.subject': 'Session booking', 'pre.tema': 'Track',
    'fl.hero': 'Home', 'fl.artistas-home': 'Artists', 'fl.historia': 'The house', 'fl.servicios-g': 'Services', 'fl.merch': 'Merch',
  } };
})();
