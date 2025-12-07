$(function () {
  $('.admin-nav-item').on('click', function () {
    var target = $(this).data('target');

    $('.admin-nav-item').removeClass('active');
    $(this).addClass('active');

    $('.admin-panel').removeClass('active');
    $('#panel-' + target).addClass('active');

    var titleMap = {
      dashboard: 'Gösterge Paneli',
      general: 'Genel Ayarlar',
      announcements: 'Duyurular',
      services: 'Hizmetler',
      branches: 'Şubeler & Bölgeler',
      blog: 'Blog Yazıları'
    };
    $('.admin-page-title').text(titleMap[target] || 'Admin Panel');
  });

  $('.admin-content').on('click', '.admin-save-btn', function () {
    alert('Kaydetme işlemi başarılı.');
  });
});



// ANNOUNCEMENTS

(function ($) {
  $(function () {

    var $id      = $('#announcement-id');
    var $title   = $('#announcement-title');
    var $date    = $('#announcement-date');
    var $excerpt = $('#announcement-excerpt');
    var $btnText = $('#announcement-button-text');
    var $btnLink = $('#announcement-button-link');
    var $content = $('#announcement-content');

    var fileInput = document.getElementById('announcement-files');
    var fileList  = document.getElementById('announcement-file-list');
    var clearBtn  = document.getElementById('clear-ann-files');

    function clearAnnouncementForm() {
      $id.val('');
      $title.val('');
      $date.val('');
      $excerpt.val('');
      $btnText.val('');
      $btnLink.val('');
      $content.val('');

      if (fileInput) fileInput.value = '';
      if (fileList) fileList.innerHTML = '';
    }

    clearAnnouncementForm();

    $(document).on('click', '.btn-ann-edit', function () {
      var $row = $(this).closest('tr');

      $id.val($row.attr('data-id') || '');
      $title.val($row.attr('data-title') || '');
      $date.val($row.attr('data-date') || '');
      $excerpt.val($row.attr('data-excerpt') || '');
      $btnText.val($row.attr('data-button-text') || '');
      $btnLink.val($row.attr('data-button-link') || '');
      $content.val($row.attr('data-content') || '');

      if (fileList) {
        fileList.innerHTML =
          '<li class="list-group-item text-muted">Bu duyuruya ait ekler sunucuda kayıtlı kabul edilmektedir.</li>';
      }
      if (fileInput) fileInput.value = '';
    });

    $('#announcement-clear-form').on('click', function () {
      clearAnnouncementForm();
    });

    // attachements 
    if (fileInput && fileList && clearBtn) {

      fileInput.addEventListener('change', function () {
        fileList.innerHTML = '';

        Array.from(fileInput.files).forEach(function (file, index) {
          var li = document.createElement('li');
          li.className = 'list-group-item d-flex justify-content-between align-items-center';

          var text = document.createElement('span');
          text.textContent = file.name + ' (' + Math.round(file.size / 1024) + ' KB)';

          var del = document.createElement('button');
          del.className = 'btn btn-outline-danger btn-sm';
          del.textContent = 'Sil';
          del.onclick = function () {
            removeFile(index);
          };

          li.appendChild(text);
          li.appendChild(del);
          fileList.appendChild(li);
        });
      });

      function removeFile(index) {
        var dt = new DataTransfer();
        Array.from(fileInput.files).forEach(function (file, i) {
          if (i !== index) dt.items.add(file);
        });
        fileInput.files = dt.files;
        fileInput.dispatchEvent(new Event('change'));
      }

      clearBtn.addEventListener('click', function () {
        fileInput.value = '';
        fileList.innerHTML = '';
      });
    }

  });
})(jQuery);



// SERVICES
(function ($) {
  $(function () {

    // --- homepage cards form ---
    var $cardName = $('#service-card-name');
    var $cardDesc = $('#service-card-desc');
    var $cardLink = $('#service-card-link');
    var $cardIcon = $('#service-card-icon');

    function clearServiceCardForm() {
      $cardName.val('');
      $cardDesc.val('');
      $cardLink.val('');
      $cardIcon.val('');
    }

    // --- services.html cards form ---
    var $name    = $('#service-detail-name');
    var $intro   = $('#service-detail-intro');
    var $feat1   = $('#service-feature-1');
    var $feat2   = $('#service-feature-2');
    var $feat3   = $('#service-feature-3');
    var $body    = $('#service-detail-body');
    var $image   = $('#service-detail-image');
    var $anchor  = $('#service-detail-anchor');
    var $btnText = $('#service-detail-btn-text');
    var $btnLink = $('#service-detail-btn-link');

    function clearServiceDetailForm() {
      $name.val('');
      $intro.val('');
      $feat1.val('');
      $feat2.val('');
      $feat3.val('');
      $body.val('');
      $image.val('');
      $anchor.val('');
      $btnText.val('');
      $btnLink.val('');
    }

    clearServiceCardForm();
    clearServiceDetailForm();

    $(document).on('click', '.btn-service-detail-edit', function () {
      var $row = $(this).closest('tr');

      $name.val($row.attr('data-name')   || '');
      $anchor.val($row.attr('data-anchor') || '');
      $image.val($row.attr('data-image') || '');

      $intro.val($row.attr('data-intro') || '');
      $feat1.val($row.attr('data-feature-1') || '');
      $feat2.val($row.attr('data-feature-2') || '');
      $feat3.val($row.attr('data-feature-3') || '');
      $body.val($row.attr('data-body') || '');
      $btnText.val($row.attr('data-btn-text') || '');
      $btnLink.val($row.attr('data-btn-link') || '');

      $cardName.val($row.attr('data-card-name')  || $row.attr('data-name') || '');
      $cardDesc.val($row.attr('data-card-desc')  || '');
      $cardLink.val($row.attr('data-card-link')  || '');
      $cardIcon.val($row.attr('data-card-icon')  || '');
    });

  });
})(jQuery);




// CONTACT

document.addEventListener('DOMContentLoaded', function () {
  const rows       = document.querySelectorAll('tr[data-message-row]');
  const emptyInfo  = document.getElementById('message-empty-info');
  const detailForm = document.getElementById('message-reply-form');

  if (!rows.length || !emptyInfo || !detailForm) return;

  rows.forEach(function (row) {
    row.addEventListener('click', function () {
      rows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');

      const ds = row.dataset; 

      document.getElementById('msg-name').value    = ds.name    || '';
      document.getElementById('msg-email').value   = ds.email   || '';
      document.getElementById('msg-subject').value = ds.subject || '';
      document.getElementById('msg-body').value    = ds.message || '';
      document.getElementById('msg-date').value    = ds.date    || '';
      document.getElementById('msg-status').value  = ds.status  || 'Yeni';

      emptyInfo.style.display  = 'none';
      detailForm.style.display = 'block';
    });
  });

  const clearBtn = document.getElementById('msg-clear-reply');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      const reply = document.getElementById('msg-reply');
      if (reply) reply.value = '';
    });
  }

  const sendBtn = document.getElementById('msg-send-reply');
  if (sendBtn) {
    sendBtn.addEventListener('click', function () {
      const reply = document.getElementById('msg-reply');
      if (!reply || !reply.value.trim()) {
        alert('Lütfen gönderilecek cevabı yazın.');
        return;
      }

      alert('Demo: Cevap gönderildi varsayıyoruz.');
      const statusSelect = document.getElementById('msg-status');
      if (statusSelect) statusSelect.value = 'Yanıtlandı';
    });
  }
});


$(document).on("click", ".btn-edit", function () {
  const data = $(this).closest("tr").data();
});

// delete
$(document).on("click", ".btn-delete", function () {
  $(this).closest("tr").remove();
});



// TEAM 
$(document).on('click', '.btn-team-edit', function () {
  const $tr = $(this).closest('tr');
  $('#team-name').val($tr.data('name'));
  $('#team-position').val($tr.data('position'));
  $('#team-desc').val($tr.data('desc'));
  $('#team-photo').val($tr.data('photo'));
});

// SSS 
$(document).on('click', '.btn-faq-edit', function () {
  const $tr = $(this).closest('tr');
  $('#faq-question').val($tr.data('question'));
  $('#faq-answer').val($tr.data('answer'));
});

// TESTIMONIAL 
$(document).on('click', '.btn-testimonial-edit', function () {
  const $tr = $(this).closest('tr');
  $('#testi-name').val($tr.data('name'));
  $('#testi-role').val($tr.data('role'));
  $('#testi-comment').val($tr.data('comment'));
  $('#testi-photo').val($tr.data('photo'));
});


// BRANCHES
$(document).on('click', '.btn-branch-edit', function () {
  const $tr = $(this).closest('tr');

  const name   = $tr.data('name')   || '';
  const city   = $tr.data('city')   || '';
  const dist   = $tr.data('district') || '';
  const phone  = $tr.data('phone')  || '';
  const type   = $tr.data('type')   || 'Şube';
  const shortT = $tr.data('short')  || '';

  $('#branch-name').val(name);
  $('#branch-city').val(city);
  $('#branch-district').val(dist);
  $('#branch-phone').val(phone);
  $('#branch-short').val(shortT);

  $('#branch-type').val(type);

});


// BLOG 
$(document).on('click', '.btn-blog-edit', function () {
  const $tr = $(this).closest('tr');

  const title    = $tr.data('title')    || '';
  const dateVal  = $tr.data('date')     || '';
  const category = $tr.data('category') || '';
  const status   = $tr.data('status')   || '';

  $('#blog-title').val(title);
  $('#blog-date').val(dateVal);
  $('#blog-categories').val(category);

});



// CLEAR FORM BUTTON
$(document).on('click', '.admin-clear-form', function () {
  var $form = $(this).closest('form');
  if (!$form.length) return;

  if ($form[0].reset) $form[0].reset();

  $form.find('input[type="hidden"]').val('');
  $form.find('textarea').val('');

  $form.find('select').each(function () {
    var $s = $(this);
    var firstVal = $s.find('option:first').val();
    $s.val(firstVal).trigger('change');
  });
});



// RESPONSIVE MENU 
// NAV İÇİ PANEL GEÇİŞLERİ
$(function () {
  $('.admin-nav-item').on('click', function () {
    var target = $(this).data('target');

    $('.admin-nav-item').removeClass('active');
    $(this).addClass('active');

    $('.admin-panel').removeClass('active');
    $('#panel-' + target).addClass('active');

    var titleMap = {
      dashboard: 'Gösterge Paneli',
      general: 'Genel Ayarlar',
      announcements: 'Duyurular',
      services: 'Hizmetler',
      branches: 'Şubeler & Bölgeler',
      blog: 'Blog Yazıları',
      messages: 'İletişim Mesajları',
      'mission-vision': 'Misyon & Vizyon',
      team: 'Ekibimiz',
      faq: 'SSS',
      testimonials: 'Müşteri Yorumları'
    };
    $('.admin-page-title').text(titleMap[target] || 'Admin Panel');
  });

  $('.admin-content').on('click', '.admin-save-btn', function () {
    alert('Kaydetme işlemi başarılı.');
  });
});


// ANNOUNCEMENTS
(function ($) {
  $(function () {

    var $id      = $('#announcement-id');
    var $title   = $('#announcement-title');
    var $date    = $('#announcement-date');
    var $excerpt = $('#announcement-excerpt');
    var $btnText = $('#announcement-button-text');
    var $btnLink = $('#announcement-button-link');
    var $content = $('#announcement-content');

    var fileInput = document.getElementById('announcement-files');
    var fileList  = document.getElementById('announcement-file-list');
    var clearBtn  = document.getElementById('clear-ann-files');

    function clearAnnouncementForm() {
      $id.val('');
      $title.val('');
      $date.val('');
      $excerpt.val('');
      $btnText.val('');
      $btnLink.val('');
      $content.val('');

      if (fileInput) fileInput.value = '';
      if (fileList) fileList.innerHTML = '';
    }

    clearAnnouncementForm();

    $(document).on('click', '.btn-ann-edit', function () {
      var $row = $(this).closest('tr');

      $id.val($row.attr('data-id') || '');
      $title.val($row.attr('data-title') || '');
      $date.val($row.attr('data-date') || '');
      $excerpt.val($row.attr('data-excerpt') || '');
      $btnText.val($row.attr('data-button-text') || '');
      $btnLink.val($row.attr('data-button-link') || '');
      $content.val($row.attr('data-content') || '');

      if (fileList) {
        fileList.innerHTML =
          '<li class="list-group-item text-muted">Bu duyuruya ait ekler sunucuda kayıtlı kabul edilmektedir.</li>';
      }
      if (fileInput) fileInput.value = '';
    });

    $('#announcement-clear-form').on('click', function () {
      clearAnnouncementForm();
    });

    // attachments
    if (fileInput && fileList && clearBtn) {

      fileInput.addEventListener('change', function () {
        fileList.innerHTML = '';

        Array.from(fileInput.files).forEach(function (file, index) {
          var li = document.createElement('li');
          li.className = 'list-group-item d-flex justify-content-between align-items-center';

          var text = document.createElement('span');
          text.textContent = file.name + ' (' + Math.round(file.size / 1024) + ' KB)';

          var del = document.createElement('button');
          del.className = 'btn btn-outline-danger btn-sm';
          del.textContent = 'Sil';
          del.onclick = function () {
            removeFile(index);
          };

          li.appendChild(text);
          li.appendChild(del);
          fileList.appendChild(li);
        });
      });

      function removeFile(index) {
        var dt = new DataTransfer();
        Array.from(fileInput.files).forEach(function (file, i) {
          if (i !== index) dt.items.add(file);
        });
        fileInput.files = dt.files;
        fileInput.dispatchEvent(new Event('change'));
      }

      clearBtn.addEventListener('click', function () {
        fileInput.value = '';
        fileList.innerHTML = '';
      });
    }

  });
})(jQuery);


// SERVICES
(function ($) {
  $(function () {

    // homepage cards
    var $cardName = $('#service-card-name');
    var $cardDesc = $('#service-card-desc');
    var $cardLink = $('#service-card-link');
    var $cardIcon = $('#service-card-icon');

    function clearServiceCardForm() {
      $cardName.val('');
      $cardDesc.val('');
      $cardLink.val('');
      $cardIcon.val('');
    }

    // services.html details
    var $name    = $('#service-detail-name');
    var $intro   = $('#service-detail-intro');
    var $feat1   = $('#service-feature-1');
    var $feat2   = $('#service-feature-2');
    var $feat3   = $('#service-feature-3');
    var $body    = $('#service-detail-body');
    var $image   = $('#service-detail-image');
    var $anchor  = $('#service-detail-anchor');
    var $btnText = $('#service-detail-btn-text');
    var $btnLink = $('#service-detail-btn-link');

    function clearServiceDetailForm() {
      $name.val('');
      $intro.val('');
      $feat1.val('');
      $feat2.val('');
      $feat3.val('');
      $body.val('');
      $image.val('');
      $anchor.val('');
      $btnText.val('');
      $btnLink.val('');
    }

    clearServiceCardForm();
    clearServiceDetailForm();

    $(document).on('click', '.btn-service-detail-edit', function () {
      var $row = $(this).closest('tr');

      $name.val($row.attr('data-name')   || '');
      $anchor.val($row.attr('data-anchor') || '');
      $image.val($row.attr('data-image') || '');

      $intro.val($row.attr('data-intro') || '');
      $feat1.val($row.attr('data-feature-1') || '');
      $feat2.val($row.attr('data-feature-2') || '');
      $feat3.val($row.attr('data-feature-3') || '');
      $body.val($row.attr('data-body') || '');
      $btnText.val($row.attr('data-btn-text') || '');
      $btnLink.val($row.attr('data-btn-link') || '');

      $cardName.val($row.attr('data-card-name')  || $row.attr('data-name') || '');
      $cardDesc.val($row.attr('data-card-desc')  || '');
      $cardLink.val($row.attr('data-card-link')  || '');
      $cardIcon.val($row.attr('data-card-icon')  || '');
    });

  });
})(jQuery);


// CONTACT
document.addEventListener('DOMContentLoaded', function () {
  const rows       = document.querySelectorAll('tr[data-message-row]');
  const emptyInfo  = document.getElementById('message-empty-info');
  const detailForm = document.getElementById('message-reply-form');

  if (!rows.length || !emptyInfo || !detailForm) return;

  rows.forEach(function (row) {
    row.addEventListener('click', function () {
      rows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');

      const ds = row.dataset;

      document.getElementById('msg-name').value    = ds.name    || '';
      document.getElementById('msg-email').value   = ds.email   || '';
      document.getElementById('msg-subject').value = ds.subject || '';
      document.getElementById('msg-body').value    = ds.message || '';
      document.getElementById('msg-date').value    = ds.date    || '';
      document.getElementById('msg-status').value  = ds.status  || 'Yeni';

      emptyInfo.style.display  = 'none';
      detailForm.style.display = 'block';
    });
  });

  const clearBtn = document.getElementById('msg-clear-reply');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      const reply = document.getElementById('msg-reply');
      if (reply) reply.value = '';
    });
  }

  const sendBtn = document.getElementById('msg-send-reply');
  if (sendBtn) {
    sendBtn.addEventListener('click', function () {
      const reply = document.getElementById('msg-reply');
      if (!reply || !reply.value.trim()) {
        alert('Lütfen gönderilecek cevabı yazın.');
        return;
      }

      alert('Demo: Cevap gönderildi varsayıyoruz.');
      const statusSelect = document.getElementById('msg-status');
      if (statusSelect) statusSelect.value = 'Yanıtlandı';
    });
  }
});


$(document).on("click", ".btn-edit", function () {
  const data = $(this).closest("tr").data();
});

// delete
$(document).on("click", ".btn-delete", function () {
  $(this).closest("tr").remove();
});


// TEAM 
$(document).on('click', '.btn-team-edit', function () {
  const $tr = $(this).closest('tr');
  $('#team-name').val($tr.data('name'));
  $('#team-position').val($tr.data('position'));
  $('#team-desc').val($tr.data('desc'));
  $('#team-photo').val($tr.data('photo'));
});

// SSS 
$(document).on('click', '.btn-faq-edit', function () {
  const $tr = $(this).closest('tr');
  $('#faq-question').val($tr.data('question'));
  $('#faq-answer').val($tr.data('answer'));
});

// TESTIMONIAL 
$(document).on('click', '.btn-testimonial-edit', function () {
  const $tr = $(this).closest('tr');
  $('#testi-name').val($tr.data('name'));
  $('#testi-role').val($tr.data('role'));
  $('#testi-comment').val($tr.data('comment'));
  $('#testi-photo').val($tr.data('photo'));
});

// BRANCHES
$(document).on('click', '.btn-branch-edit', function () {
  const $tr = $(this).closest('tr');

  $('#branch-name').val($tr.data('name')   || '');
  $('#branch-city').val($tr.data('city')   || '');
  $('#branch-district').val($tr.data('district') || '');
  $('#branch-phone').val($tr.data('phone') || '');
  $('#branch-short').val($tr.data('short') || '');
  $('#branch-type').val($tr.data('type')   || 'Şube');
});

// BLOG 
$(document).on('click', '.btn-blog-edit', function () {
  const $tr = $(this).closest('tr');

  $('#blog-title').val($tr.data('title')    || '');
  $('#blog-date').val($tr.data('date')      || '');
  $('#blog-categories').val($tr.data('category') || '');
});


// CLEAR FORM BUTTON
$(document).on('click', '.admin-clear-form', function () {
  var $form = $(this).closest('form');
  if (!$form.length) return;

  if ($form[0].reset) $form[0].reset();

  $form.find('input[type="hidden"]').val('');
  $form.find('textarea').val('');

  $form.find('select').each(function () {
    var $s = $(this);
    var firstVal = $s.find('option:first').val();
    $s.val(firstVal).trigger('change');
  });
});


// RESPONSIVE MENU
$(function () {

  $('.admin-menu-toggle').on('click', function () {
    $(this).toggleClass('is-open');
    $('.admin-sidebar').toggleClass('is-open');
    $('body').toggleClass('sidebar-open');
  });

  $('.admin-overlay').on('click', function () {
    $('.admin-sidebar').removeClass('is-open');
    $('.admin-menu-toggle').removeClass('is-open');
    $('body').removeClass('sidebar-open');
  });

  $('.admin-nav-item').on('click', function () {
    if (window.innerWidth <= 991) {
      $('.admin-sidebar').removeClass('is-open');
      $('.admin-menu-toggle').removeClass('is-open');
      $('body').removeClass('sidebar-open');
    }
  });

});
